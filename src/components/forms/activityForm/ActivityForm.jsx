import React, { useContext, useEffect, useState } from 'react'
import comunidadesData from "../../../models/Comunidades.json";
import { SessionContext } from "../../contexts/SessionContext";
import axios from 'axios';

const ActivityForm = ({actividad, setActividad, onGuardar, onLimpiar}) => {

	const COMUNIDADES = comunidadesData.comunidades;


	const [comunidadInputDesactivado, setComunidadInputDesactivado] = useState(false);
	const [provinciaInputDesactivado, setProvinciaInputDesactivado] = useState(false);
	const { user } = useContext(SessionContext);
	const [comunidades, setComunidades] = useState(COMUNIDADES);
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


	function onCambioEnComunidad(e) {
		const input = String(e.target.value);
		setActividad({ ...actividad, comunidad: input });
	}


	function onCambioEnProvincia(e) {
		const input = String(e.target.value);
		let nombreComunidad = "";
		if(input !== "") {
			const comunidad = comunidades.find(x=>x.provincias.map(y=>y.name).includes(input))
			if(comunidad){
				nombreComunidad = comunidad.name
			}
		}
		setActividad({...actividad, comunidad: nombreComunidad, provincia: input})
	}


  return (
		<form>
			<fieldset>
				<label htmlFor="nombre">Nombre de la actividad</label>
				<input
					value={actividad?.nombre}
					onChange={e => setActividad({ ...actividad, nombre: e.target.value })}
					type="text"
					name="nombre"
				></input>
			</fieldset>
			<fieldset>
				<label htmlFor="descripcion">Descripción de la actividad</label>
				<textarea
					value={actividad?.descripcion}
					onChange={e => setActividad({ ...actividad, descripcion: e.target.value })}
					name="descripcion"
				></textarea>
			</fieldset>
			<fieldset>
				<label htmlFor="tipo">Tipo de actividad</label>
				<select
					value={actividad?.tipo === "ciudad" ? "Plan de ciudad" : "Plan rural"}
					onChange={e => setActividad({ ...actividad, tipo: e.target.value })}
				>
					<option name="ciudad">Plan de ciudad</option>
					<option name="rural">Plan rural</option>
				</select>
			</fieldset>
			<fieldset>
				<label htmlFor="comunidad">Comunidad</label>
				<input
					id="comunidad"
					name="comunidad"
					multiple
					list="lista-comunidades"
					placeholder="Comunidad"
					value={actividad?.comunidad}
					onChange={e => onCambioEnComunidad(e)}
					disabled={comunidadInputDesactivado}
				></input>
				<datalist id="lista-comunidades">
					{comunidades.map((com, i) => {
						return (
							<option key={i} selected={com.name === actividad.comunidad}>
								{com.name}
							</option>
						);
					})}
				</datalist>
			</fieldset>
			<fieldset>
				<label htmlFor="provincia">Provincia {actividad.comunidad}</label>
				<input
					id="provincia"
					name="provincia"
					multiple
					list="lista-provincias"
					placeholder="Provincia"
					value={actividad?.provincia}
					onChange={e => onCambioEnProvincia(e)}
					disabled={provinciaInputDesactivado}
				></input>
				<datalist id="lista-provincias">
					{comunidades.find(y => y.name === actividad.comunidad)
						? provincias
								.filter(x =>
									comunidades
										.find(y => y.name === actividad.comunidad)
										.provincias.map(y => y.name)
										.includes(x.nombre)
								)
								.map((pro, i) => (
									<option key={i} selected={pro.nombre === actividad.provincia}>
										{pro.nombre}
									</option>
								))
						: provincias.map((pro, i) => (
								<option key={i} selected={pro.nombre === actividad.provincia}>
									{pro.nombre}
								</option>
						  ))}
				</datalist>
			</fieldset>
			<fieldset>
				<label htmlFor="img">Imagen de la actividad</label>
				<input
					value={actividad?.img}
					onChange={e => setActividad({ ...actividad, img: e.target.value })}
					type="text"
					name="img"
				></input>
			</fieldset>
			<button type="button" onClick={onGuardar}>
				Crear actividad
			</button>
			<button type="button" onClick={onLimpiar}>
				Limiar datos
			</button>
		</form>
	);
}

export default ActivityForm
