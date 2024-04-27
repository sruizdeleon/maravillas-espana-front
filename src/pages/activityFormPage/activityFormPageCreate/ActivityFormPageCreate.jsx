import React, { useEffect, useState } from 'react'
import ActivityForm from '../../../components/forms/activityForm/ActivityForm'
import './ActivityFormPageCreate.css'
import axios from 'axios';
import Swal from 'sweetalert2';

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

  const [actividad, setActividad] = useState(actividadVacia);
	const [provincias, setProvincias] = useState([]);

	useEffect(() => {
		obtenerProvincias();
	}, []);

	async function obtenerProvincias() {
		axios
			.get(`http://localhost:3000/api/provincias`)
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
		axios
			.post(`http://localhost:3000/api/actividades`, actividadPost)
			.then(response => {
				Swal.fire({
					icon: "success",
					title: "Actividad creada con éxito",
					text: `La actividad: ${actividad.nombre}, fue creada con éxito.`,
				});
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
	}

  return (
    <section className='page'>
      <div className='activity-fomr__contianer'>
        <h1 className='activity-form__title'>Formulario de actividad</h1>
        <ActivityForm actividad={actividad} setActividad={setActividad} onGuardar={crearActividad}></ActivityForm>
      </div>
    </section>
  )
}

export default ActivityFormPageCreate
