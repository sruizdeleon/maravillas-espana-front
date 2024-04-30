import React, { useContext, useEffect, useState } from "react";
import comunidadesData from "../../../models/Comunidades.json";
import provinciasData from "../../../models/Provincias.json";
import { SessionContext } from "../../../contexts/SessionContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ActivityForm.css";

const ActivityForm = ({ actividad, setActividad, onGuardar, onEditar }) => {
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
	const navigate = useNavigate();

	const { user } = useContext(SessionContext);
	const [comunidadInputDesactivado, setComunidadInputDesactivado] = useState(false);
	const [provinciaInputDesactivado, setProvinciaInputDesactivado] = useState(false);
	const [comunidades, setComunidades] = useState(COMUNIDADES);
	const [provincias, setProvincias] = useState(PROVINCIAS);

	useEffect(() => {
		obtenerProvincias();
	}, []);

	async function obtenerProvincias() {
		const token = user.token;
		axios
			.get(`http://localhost:3000/api/provincias?token=${token}`)
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
		navigate(`/activity-create`);
	}

	return (
		<form  className="activity-form__form">
			<div className="activity-form__body">
				<div className="activity-form__columns">
					{/* NOMBRE */}
					<fieldset className="activity-form__fieldset">
						<label className="activity-form__label" htmlFor="nombre">
							Nombre de la actividad
						</label>
						<input
							placeholder="Actividad"
							className="activity-form__input"
							value={actividad?.nombre}
							onChange={e => setActividad({ ...actividad, nombre: e.target.value })}
							type="text"
							name="nombre"
						></input>
					</fieldset>

					{/* DESCRIPCION */}
					<fieldset className="activity-form__fieldset--text-area">
						<label className="activity-form__label" htmlFor="descripcion">
							Descripción de la actividad
						</label>
						<textarea
							placeholder="En esta actividad..."
							className="activity-form__text-area"
							value={actividad?.descripcion}
							onChange={e => setActividad({ ...actividad, descripcion: e.target.value })}
							name="descripcion"
						></textarea>
					</fieldset>
				</div>
				<div className="activity-form__columns">
					<div className="activity-form__rows">
						{/* COMUNIDAD */}
						<fieldset className="activity-form__fieldset">
							<label className="activity-form__label" htmlFor="comunidad">
								Comunidad
							</label>
							<input
								className="activity-form__input"
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
								{comunidades.map((comunidad, index) => (
									<option key={index}>{comunidad.name}</option>
								))}
							</datalist>
						</fieldset>

						{/* PROVINCIA */}
						<fieldset className="activity-form__fieldset">
							<label className="activity-form__label" htmlFor="provincia">
								Provincia
							</label>
							<input
								className="activity-form__input"
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
					</div>

					<div className="activity-form__rows">
						{/* TIPO DE ACTIVIDAD */}
						<fieldset className="activity-form__fieldset">
							<label className="activity-form__label" htmlFor="tipo">
								Tipo de actividad
							</label>
							<input
								className="activity-form__input"
								placeholder="Tipo de actividad"
								value={actividad?.tipo === "" ? "" : actividad.tipo === "ciudad" ? "Plan de ciudad" : "Plan rural"}
								list="lista-tipos"
								onChange={e => onCambioEnPlan(e)}
							></input>
							<datalist id="lista-tipos">
								<option name="ciudad">Plan de ciudad</option>
								<option name="rural">Plan rural</option>
							</datalist>
						</fieldset>

						{/* IMAGEN ACTIVIDAD */}
						<fieldset className="activity-form__fieldset">
							<label className="activity-form__label" htmlFor="img">
								Imagen de la actividad
							</label>
							<input
								placeholder="https://..."
								className="activity-form__input"
								value={actividad?.img}
								onChange={e => setActividad({ ...actividad, img: e.target.value })}
								type="text"
								name="img"
							></input>
						</fieldset>
					</div>

					{actividad.img ? (
						<img className="activity-form__img" src={actividad.img}></img>
					) : (
						<div className="activity-form__img-skeleton">
							<p>Añade tu imgen para previsualizarla</p>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="80"
								height="80"
								fill="white"
								class="bi bi-image-fill"
								viewBox="0 0 16 16"
							>
								<path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
							</svg>
						</div>
					)}
				</div>
			</div>
			<div className="activity-form__footer">
				{/* BOTONES */}
				{onGuardar && actividad._id === "" ? (
					<button className="activity-form__button" type="button" onClick={onGuardar}>
						Crear actividad
					</button>
				) : (
					""
				)}
				{onEditar && actividad._id !== "" ? (
					<button className="activity-form__button" type="button" onClick={onEditar}>
						Guardar cambios
					</button>
				) : (
					""
				)}
				<button className="activity-form__button" type="button" onClick={limpiarDatos}>
					Limpiar datos
				</button>
			</div>
		</form>
	);
};

export default ActivityForm;
