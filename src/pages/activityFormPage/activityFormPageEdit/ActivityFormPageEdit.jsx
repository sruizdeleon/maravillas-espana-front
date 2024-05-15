import React, { useEffect, useState } from 'react'
import ActivityForm from '../../../components/forms/activityForm/ActivityForm'
import './ActivityFormPageEdit.css'
import { useNavigate, useParams } from 'react-router-dom';
import { SessionContext } from "../../../contexts/SessionContext";
import axios from 'axios';
import Swal from 'sweetalert2';
import "./ActivityFormPageEdit.css";
import { useContext } from 'react';

const ActivityFormPageEdit = () => {
  const actividadVacia = {
    _id: "",
		provincia: "",
		comunidad: "",
		nombre: "",
		descripcion: "",
		img: "",
		tipo: "",
	};
	const { user } = useContext(SessionContext);
  const { id } = useParams();
  const [actividad, setActividad] = useState(actividadVacia);
  const navigate = useNavigate()
    useEffect(() => {
      getActivityById();
    }, []);

    const getActivityById = async () => {
      const token = user.token
      const resultado = await axios.get(`http://localhost:3000/api/actividades/${id}?token=${token}`);
      setActividad({
        ...resultado.data.actividadEncontrada,
        provincia: resultado.data.actividadEncontrada.provincia.nombre,
      });
    };

  	function editarActividad() {
      const token = user.token
      Swal.fire({
        icon: "warning",
        title: "Guardar cambios en actividad",
        text: `¿Seguro que quieres guardar los cambios en la actividad: ${actividad.nombre}?`,
        showConfirmButton: true,
        confirmButtonText: "Guardar cambios",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
      }).then(result => {
        if (result.isConfirmed) {
          let actividadPut = actividad;
          actividadPut.provincia = actividad.provincia._id
          axios
						.put(`http://localhost:3000/api/actividades/${actividad._id}?token=${token}`, actividadPut)
						.then(response => {
							Swal.fire({
								icon: "success",
								title: "Actividad modificada",
								text: `La actividad: ${actividad.nombre}, fue modificada con éxito.`,
							});
							console.log(response);
							navigate(`/activity/${actividad._id}`);
						})
						.catch(error => {
							console.log(error);
						});
        }
      });
		}

  return (
		<section className="page">
			<div className="activity-form__container">
				<h1 className="activity-form__title">Editar actividad</h1>
				<ActivityForm actividad={actividad} setActividad={setActividad} onEditar={editarActividad}></ActivityForm>
			</div>
		</section>
	);
}

export default ActivityFormPageEdit
