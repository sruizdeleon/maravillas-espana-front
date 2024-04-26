import React, { useEffect, useState } from 'react'
import comunidadesData from "../../../models/Comunidades.json";
import provinciasData from "../../../models/Provincias.json";
import Swal from "sweetalert2";
import axios from 'axios';

const ActivityForm = () => {

	const DEFAULTDATOS = {
		nombre: "",
		descripcion: "",
		img: "",
		provincia: "",
		comunidad: "",
		tipo: "",
	};
	const COMUNIDADES = comunidadesData.comunidades;
	const PROVINCIAS = provinciasData.provincias;


  const [datos, setDatos] = useState(DEFAULTDATOS);
	const [comunidadInputDesactivado, setComunidadInputDesactivado] = useState(false);
	const [provinciaInputDesactivado, setProvinciaInputDesactivado] = useState(false);
	// const { user } = useContext(SessionContext);
	const [comunidades, setComunidades] = useState(COMUNIDADES);
	const [provincias, setProvincias] = useState(PROVINCIAS);
	const [provinciasConId, setProvinciasConId] = useState("");

  console.log(datos)

	useEffect(() => {
		axios
			.get(`http://localhost:3000/api/provincias`)
			.then(response => {
				const provinciasConId = response.data.provinciasEncontradas.map(prov => {
					return prov;
				});
				setProvinciasConId(provinciasConId);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

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
		setDatos(DEFAULTDATOS);
		setProvincias(PROVINCIAS);
		setComunidades(COMUNIDADES);
		setProvinciaInputDesactivado(false);
		setComunidadInputDesactivado(false);
	}

	function onCambioEnComunidad(e) {
		const input = String(e.target.value);
		setDatos({ ...datos, comunidad: input });
		if (datos.provincia === "" && input === "") {
			setDatos({ ...datos, comunidad: "", provincia: "" });
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
		setDatos({ ...datos, provincia: input });
		if (input === "") {
			if (datos.comunidad === "" && input === "") {
				setDatos({ ...datos, comunidad: "", provincia: "" });
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
								setDatos({ ...datos, comunidad: com.name, provincia: input });
							}
						});
				});
			} else {
				setDatos({ ...datos, comunidad: "", provincia: input });
			}
		}
	}


  return (
		<form>
			<fieldset>
				<label htmlFor="nombre">Nombre de la actividad</label>
				<input onChange={e => setDatos({ ...datos, nombre: e.target.value })} type="text" name="nombre"></input>
			</fieldset>
			<fieldset>
				<label htmlFor="descripcion">Descripción de la actividad</label>
				<textarea onChange={e => setDatos({ ...datos, descripcion: e.target.value })} name="descripcion"></textarea>
			</fieldset>
			<fieldset>
				<label htmlFor="tipo">Tipo de actividad</label>
				<select onChange={e => setDatos({ ...datos, tipo: e.target.value })}>
					<option name="ciudad">Plan de ciudad</option>
					<option name="rural">Plan rural</option>
				</select>
			</fieldset>
			<fieldset>
				<label htmlFor="comunidad">Comunidad y provincia</label>
				<input
					id="comunidad"
					name="comunidad"
					multiple
					list="lista-comunidades"
					placeholder="Comunidad"
					value={datos.comunidad}
					onChange={e => onCambioEnComunidad(e)}
					disabled={comunidadInputDesactivado}
				></input>
				<datalist id="lista-comunidades">
					{comunidades.map((com, i) => {
						return <option key={i}>{com.name}</option>;
					})}
				</datalist>
			</fieldset>
			<fieldset>
				<label htmlFor="provincia">Provincia</label>
				<input
					id="provincia"
					name="provincia"
					multiple
					list="lista-provincias"
					placeholder="Provincia"
					value={datos.provincia}
					onChange={e => onCambioEnProvincia(e)}
					disabled={provinciaInputDesactivado}
				></input>
				<datalist id="lista-provincias">
					{provincias.map((pro, i) => {
						return <option key={i}>{pro.name}</option>;
					})}
				</datalist>
			</fieldset>
			<fieldset>
				<label htmlFor="img">Imagen de la actividad</label>
				<input onChange={e => setDatos({ ...datos, img: e.target.value })} type="text" name="img"></input>
			</fieldset>
			<button type='button' onClick={()=>crearActividad()}>Crear actividad</button>
			<button type='button' onClick={()=>limpiarDatos()}>Limiar datos</button>
		</form>
	);
}

export default ActivityForm
