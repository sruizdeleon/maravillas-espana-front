import React, { useState } from 'react'
import ActivityForm from '../../components/forms/activityForm/ActivityForm'
import './ActivityFormPageCreate.css'

const ActivityFormPageCreate = () => {
  const actividadVacia = {
		provincia: "",
		comunidad: "",
		nombre: "",
		descripcion: "",
		img: "",
		tipo: "",
	};

  const [actividad, setActividad] = useState(actividadVacia);

  	function crearActividad() {
			let actividadPost = datos;
			if (datos.provincia !== "") {
				provinciasConId.map(prov => {
					if (datos.provincia === prov.nombre) {
						actividadPost.provincia = prov._id;
					}
				});
			}
			axios
				.post(`http://localhost:3000/api/actividades`, actividadPost)
				.then(response => {
					console.log(response);
				})
				.catch(error => {
					console.log(error);
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
        <ActivityForm actividad={actividad} setActividad={setActividad} onGuardar={crearActividad} onLimpiar={limpiarDatos}></ActivityForm>
      </div>
    </section>
  )
}

export default ActivityFormPageCreate
