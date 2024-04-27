import React, { useEffect, useState } from 'react'
import ActivityForm from '../../../components/forms/activityForm/ActivityForm'
import './ActivityFormPageEdit.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ActivityFormPageEdit = () => {
  const actividadVacia = {
		provincia: "",
		comunidad: "",
		nombre: "",
		descripcion: "",
		img: "",
		tipo: "",
	};
  const { id } = useParams();
  const [actividad, setActividad] = useState(actividadVacia);

    useEffect(() => {
      getActivityById();
    }, []);

    const getActivityById = async () => {
      const resultado = await axios.get(`http://localhost:3000/api/actividades/${id}`);
      setActividad({
        ...resultado.data.actividadEncontrada,
        provincia: resultado.data.actividadEncontrada.provincia.nombre,
      });
    };

  	function editarActividad() {
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
            .put(`http://localhost:3000/api/actividades/${actividad._id}`, actividadPut)
            .then(response => {
              Swal.fire({
                icon: "success",
                title: "Actividad modificada",
                text: `La actividad: ${actividad.nombre}, fue modificada con éxito.`
              })
              console.log(response);
              getActivityById();
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
		}

		function limpiarDatos() {
			setActividad(actividadVacia);
			// setProvincias(PROVINCIAS);
			// setComunidades(COMUNIDADES);
			// setProvinciaInputDesactivado(false);
			// setComunidadInputDesactivado(false);
		}


  return (
    <section className='page'>
      <div className='activity-fomr__contianer'>
        <h1 className='activity-form__title'>Formulario de actividad</h1>
        <ActivityForm actividad={actividad} setActividad={setActividad} onEditar={editarActividad} onLimpiar={limpiarDatos}></ActivityForm>
      </div>
    </section>
  )
}

export default ActivityFormPageEdit
