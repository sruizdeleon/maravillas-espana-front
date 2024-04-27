import React, { useContext, useEffect, useState } from 'react'
import comunidadesData from "../../../models/Comunidades.json";
import provinciasData from "../../../models/Provincias.json";

import { SessionContext } from "../../contexts/SessionContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ActivityForm = ({actividad, setActividad, onGuardar, onEditar}) => {

	const actividadVacia = {
		_id: "",
		provincia: "",
		comunidad: "",
		nombre: "",
		descripcion: "",
		img: "",
		tipo: "",
	};
	const COMUNIDADES = comunidadesData.comunidades;
	const PROVINCIAS = provinciasData.provincias;
	const navigate = useNavigate()

	const { user } = useContext(SessionContext);
	const [comunidadInputDesactivado, setComunidadInputDesactivado] = useState(false);
	const [provinciaInputDesactivado, setProvinciaInputDesactivado] = useState(false);
	const [comunidades, setComunidades] = useState(COMUNIDADES);
	const [provincias, setProvincias] = useState(PROVINCIAS);

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
		if (actividad.provincia === "" && input === "") {
			setActividad({ ...actividad, comunidad: "", provincia: "" });
			setComunidadInputDesactivado(false);
			setProvinciaInputDesactivado(false);
			setComunidades(COMUNIDADES);
			setProvincias(PROVINCIAS);
		}
		if (input !== "") {
			setProvinciaInputDesactivado(true);
			let contineComunidad = false;
			COMUNIDADES.map(com => {
				if (com.name === input) {
					contineComunidad = true;
					com.provincias && setProvincias(com.provincias);
					setProvinciaInputDesactivado(false);
				}
			});
			if (!contineComunidad) {
				setProvincias(PROVINCIAS);
			}
		}
	}

	function onCambioEnProvincia(e) {
		const input = String(e.target.value);
		setActividad({ ...actividad, provincia: input });
		if (input === "") {
			if (actividad.comunidad === "" && input === "") {
				setActividad({ ...actividad, comunidad: "", provincia: "" });
				setComunidadInputDesactivado(false);
				setProvinciaInputDesactivado(false);
				setComunidades(COMUNIDADES);
				setProvincias(PROVINCIAS);
			}
		} else {
			setComunidadInputDesactivado(true);
			let contieneProvincia = false;
			PROVINCIAS.map(prov => {
				if (prov.name === input) {
					contieneProvincia = true;
				}
			});
			if (contieneProvincia) {
				COMUNIDADES.map(com => {
					com.provincias &&
						com.provincias.map(prov => {
							if (prov.name === input) {
								setActividad({ ...actividad, comunidad: com.name, provincia: input });
							}
						});
				});
			} else {
				setActividad({ ...actividad, comunidad: "", provincia: input });
			}
		}
	}

	function onCambioEnPlan(e) {
		const input = String(e.target.value);
		if (input === "Plan de ciudad") {
			setActividad({ ...actividad, tipo: "ciudad" });
		} else if (input === "Plan rural") {
			setActividad({ ...actividad, tipo: "rural" });
		} else {
			setActividad({ ...actividad, tipo: "" });
		}
	}

	function limpiarDatos() {
		setActividad(actividadVacia);
		setProvincias(PROVINCIAS);
		setComunidades(COMUNIDADES);
		setProvinciaInputDesactivado(false);
		setComunidadInputDesactivado(false);
		navigate(`/activity-create`)
	}

  return (
		<form>
			<fieldset>

			{/* NOMBRE */}
				<label htmlFor="nombre">Nombre de la actividad</label>
				<input
					value={actividad?.nombre}
					onChange={e => setActividad({ ...actividad, nombre: e.target.value })}
					type="text"
					name="nombre"
				></input>
			</fieldset>

			{/* DESCRIPCION */}
			<fieldset>
				<label htmlFor="descripcion">Descripción de la actividad</label>
				<textarea
					value={actividad?.descripcion}
					onChange={e => setActividad({ ...actividad, descripcion: e.target.value })}
					name="descripcion"
				></textarea>
			</fieldset>


			{/* TIPO DE ACTIVIDAD */}
			<fieldset>
				<label htmlFor="tipo">Tipo de actividad</label>
				<select
					value={actividad?.tipo === "ciudad" ? "Plan de ciudad" : "Plan rural"}
					onChange={e => onCambioEnPlan(e)}
				>
					<option name="ciudad">Plan de ciudad</option>
					<option name="rural">Plan rural</option>
				</select>
			</fieldset>


			{/* COMUNIDAD */}
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
					<datalist id="lista-comunidades">
						{comunidades.map((comunidad, index) => (
							<option key={index}>{comunidad.name}</option>
						))}
					</datalist>
				</datalist>
			</fieldset>


			{/* PROVINCIA */}
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
					{provincias.map((provincia, index) => (
						<option key={index}>{provincia.name}</option>
					))}
				</datalist>
			</fieldset>


			{/* IMAGEN ACTIVIDAD */}
			<fieldset>
				<label htmlFor="img">Imagen de la actividad</label>
				<input
					value={actividad?.img}
					onChange={e => setActividad({ ...actividad, img: e.target.value })}
					type="text"
					name="img"
				></input>
			</fieldset>
			{actividad.img ? <img style={{ width: "100px" }} src={actividad.img}></img> : ""}


			{/* BOTONES */}
			{onGuardar && actividad._id === "" ? (
				<button type="button" onClick={onGuardar}>
					Crear actividad
				</button>
			) : (
				""
			)}
			{onEditar && actividad._id !== "" ? (
				<button type="button" onClick={onEditar}>
					Guardar cambios
				</button>
			) : (
				""
			)}
			<button type="button" onClick={limpiarDatos}>
				Limiar datos
			</button>
		</form>
	);
}

export default ActivityForm
