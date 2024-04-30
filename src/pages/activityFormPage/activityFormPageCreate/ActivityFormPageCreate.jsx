import React, { useEffect, useState } from 'react'
import ActivityForm from '../../../components/forms/activityForm/ActivityForm'
import { SessionContext } from "../../../contexts/SessionContext";
import './ActivityFormPageCreate.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const ActivityFormPageCreate = () => {
  const actividadVacia = {
		_id: "",
		provincia: "",
		comunidad: "",
		nombre: "",
		descripcion: "",
		img: "",
		tipo: "",
	};
	
	const navigate = useNavigate()
	const { user } = useContext(SessionContext);
  const [actividad, setActividad] = useState(actividadVacia);
	const [provincias, setProvincias] = useState([]);

	useEffect(() => {
		obtenerProvincias();
	}, []);

	async function obtenerProvincias() {
		const token = user.token
		axios
				.get(`http://localhost:3000/api/provincias?token=${token}`)
				.then(response => {
					setProvincias(response.data.provinciasEncontradas);
				})
				.catch(error => {
					console.log(error);
				});
	}

	function crearActividad() {
		let actividadPost = actividad;
		if (actividad.provincia !== "") {
			provincias.map(prov => {
				if (actividad.provincia === prov.nombre) {
					actividadPost.provincia = prov._id;
				}
			});
		}
		console.log(actividadPost)
		const token = user.token;
		axios
			.post(`http://localhost:3000/api/actividades?token=${token}`, actividadPost)
			.then(response => {
				Swal.fire({
					icon: "success",
					title: "Actividad creada con éxito",
					text: `La actividad: ${actividad.nombre}, fue creada con éxito.`,
				});
				console.log(response);
				navigate(`/activity/${response.data.nuevaActividad._id}`)
			})
			.catch(error => {
				console.log(error);
			});
	}

  return (
    <section className='page'>
      <div className='activity-form__container'>
        <h1 className='activity-form__title'>Crear actividad</h1>
        <ActivityForm actividad={actividad} setActividad={setActividad} onGuardar={crearActividad}></ActivityForm>
      </div>
    </section>
  )
}

export default ActivityFormPageCreate
