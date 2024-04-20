import { useEffect, useState } from 'react';
import comunidadesData from '../../models/Comunidades.json';
import provinciasData from '../../models/Provincias.json';
// import { SessionContext } from "../../contexts/SessionContext";
import axios from 'axios';

const Home = () => {
	const DEFAULTDATOS = { comunidad: "", provincia: "", plan: ""}
	const DEFAULTFILTROS = {provincias: [], plan: ""}
	const COMUNIDADES = comunidadesData.comunidades;
	const PROVINCIAS = provinciasData.provincias;

	// const { user } = useContext(SessionContext);
	const [actividades, setActividades] = useState("");
	const [actividadesFiltradas, setActividadesFiltradas] = useState("");
	// const [provinciasPosiblesFiltrar, setProvinciasPosiblesFiltrar] = useState("");
	// const [filtros, setFiltros] = useState(DEFAULTFILTROS);
	const [datos, setDatos] = useState(DEFAULTDATOS)
	const [provinciasConId, setProvinciasConId] = useState("");
	const [comunidades, setComunidades] = useState(COMUNIDADES);
	const [comunidadDesactivado, setComunidadDesactivado] = useState(false)
	const [provincias, setProvincias] = useState(PROVINCIAS)
	const [provinciaDesactivada, setProvinciaDesactivada] = useState(false)

	// console.log("Normales", actividades);
	// console.log("Filtradas", actividadesFiltradas);

	useEffect(()=>{
		axios
			.get(
				`http://localhost:3000/api/provincias`
			)
			.then(response => {
				const provinciasConId = response.data.provinciasEncontradas.map((prov)=>{
					return prov
				})
				setProvinciasConId(provinciasConId)
			})
			.catch(error => {
				console.log(error);
			});
	}, [])

	function onCambioEnComunidad(e) {
		const input = String(e.target.value);
		setDatos({...datos, comunidad: input})
		if(datos.provincia === "" && input === ""){
			setDatos({ ...datos, comunidad: "", provincia: ""});
			setComunidadDesactivado(false);
			setProvinciaDesactivada(false);
			setComunidades(COMUNIDADES);
			setProvincias(PROVINCIAS);
		}
		if(input !== ""){
			setProvinciaDesactivada(true)
			let contineComunidad = false;
			COMUNIDADES.map((com)=>{
				if(com.name === input) {
					contineComunidad = true;
					com.provincias && setProvincias(com.provincias);
					setProvinciaDesactivada(false);
				}
			})
			if(!contineComunidad){
				setProvincias(PROVINCIAS);
			}
		}
	}

	function onCambioEnProvincia(e) {
		const input = String(e.target.value);
		setDatos({ ...datos, provincia: input });
		if(input === "") {
			if(datos.comunidad === "" && input === "") {
				setDatos({...datos, comunidad: "", provincia: ""})
				setComunidadDesactivado(false)
				setProvinciaDesactivada(false)
				setComunidades(COMUNIDADES)
				setProvincias(PROVINCIAS)
			}
		} else {
			setComunidadDesactivado(true);
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
								setDatos({ ...datos, comunidad: com.name, provincia: input});
							}
						});
				});
			} else {
				setDatos({ ...datos, comunidad: "", provincia: input });
			}
		}
	}

	function onCambioEnPlan(e) {
		const input = String(e.target.value);
		if(input === "Plan de ciudad") {
			setDatos({ ...datos, plan: "ciudad" });
		}
		if(input === "Plan rural") {
			setDatos({ ...datos, plan: "rural" });
		}
	}

	async function guardarActividades(response) {
		if(datos.plan === "ciudad") {
			const actividadesPlanCiudad = new Array;
			response.map((actividad) => {
				if(actividad.tipo === "ciudad"){
					actividadesPlanCiudad.push(actividad);
				}
			});
			console.log(actividadesPlanCiudad);
			setActividades(actividadesPlanCiudad);
		} else if (datos.plan === "rural") {
			let actividadesPlanRural = new Array;
			response.map(actividad => {
				if(actividad.tipo === "rural"){
					actividadesPlanRural.push(actividad);
				}
			})
			console.log(actividadesPlanRural);
			setActividades(actividadesPlanRural);
		} else {
			setActividades(response)
		}
	}

	async function buscarActividades() {
		let idEncontrado;
		if (datos.provincia !== "") {
			provinciasConId.map(prov => {
				if (datos.provincia === prov.nombre) {
					idEncontrado = prov.provinciaId;
				}
			});
		}
		axios
			.get(
				`http://localhost:3000/api/actividades`,{params: {comunidad: datos.comunidad, provinciaId:idEncontrado}}
			)
			.then(response => {
				const respuesta = response.data.actividadesEncontradas;
				console.log(respuesta);
				guardarActividades(respuesta);
			})
			.catch(error => {
				console.log(error);
			});
	}

/* 	function filtrarPorProvincia(event) {
		const inputProvincia = event.target.value
		const filtroProvincias = filtros.provincias;
		if (filtroProvincias.includes(inputProvincia) === false) {
			let arrayProvincias = filtros.provincias;
			arrayProvincias.push(inputProvincia);
			setFiltros({ ...filtros, provincias: arrayProvincias });
		} else {
			let arrayProvincias = filtros.provincias;
			console.log(arrayProvincias)
			arrayProvincias.splice(arrayProvincias.indexOf(inputProvincia), 1);
			setFiltros({ ...filtros, provincias: arrayProvincias });
		}
	} */

	return (
		<>
			<section>
				<form>
					{/* INPUT COMUNIDADES */}
					<div>
						<label htmlFor="comunidad">Comunidad</label>
						<input
							id="comunidad"
							name="comunidad"
							multiple
							list="lista-comunidades"
							placeholder="Comunidad"
							value={datos.comunidad}
							onChange={e => onCambioEnComunidad(e)}
							disabled={comunidadDesactivado}
						></input>
						<datalist id="lista-comunidades">
							{comunidades.map((comunidad, index) => (
								<option key={index}>{comunidad.name}</option>
							))}
						</datalist>
					</div>

					{/* INPUT PROVINCIAS */}
					<div>
						<label htmlFor="provincia">Provincia</label>
						<input
							id="provincia"
							name="provincia"
							multiple
							list="lista-provincias"
							placeholder="Provincias"
							onChange={e => onCambioEnProvincia(e)}
							disabled={provinciaDesactivada}
						></input>
						<datalist id="lista-provincias">
							{provincias.map((provincia, index) => (
								<option key={index}>{provincia.name}</option>
							))}
						</datalist>
					</div>

					{/* INPUT TIPO DE PLAN */}
					<div>
						<label htmlFor="plan">Tipo de plan</label>
						<input
							id="plan"
							name="plan"
							multiple
							list="lista-planes"
							placeholder="Tipo de plan"
							onChange={e => onCambioEnPlan(e)}
						></input>
						<datalist id="lista-planes">
							<option>Plan de ciudad</option>
							<option>Plan rural</option>
						</datalist>
					</div>
					<button type="button" onClick={buscarActividades}>
						Buscar
					</button>
				</form>
			</section>

			{/* RESULTADOS DE BÚSQUEDA */}
			<section>
				<div>
					<h2>Aquí están los mejores planes</h2>

					{/* FILTROS */}
					<div>
						{/* <h5>Filtros</h5>
						<form>
							<fieldset>
								<legend>Plan</legend>
								<button type="button">Plan de ciudad</button>
								<button type="button">Plan de campo</button>
							</fieldset>
							<fieldset>
								{
									provinciasPosiblesFiltrar.length > 0
										? provinciasPosiblesFiltrar.map((prov)=>{
											return (
												<>
													<input
														id="prov.value"
														type="checkbox"
														value={prov.value}
														onChange={(e) => filtrarPorProvincia(e)}
														checked={filtros.provincias.includes(prov.name.toLowerCase())? true : false}
													/>
													<label htmlFor={prov.value}>{prov.name}</label>
												</>
											);
										})
										: ""
								}
							</fieldset>
						</form> */}
					</div>
				</div>

				{/*
				 */}
				<div>
					{/* Bucle con Componente tarjeta actividad */}
					{actividadesFiltradas !== ""
						? actividadesFiltradas &&
							actividadesFiltradas.map(actividad => {
								return (
									<>
										<article>
											<img src={actividad?.img} />
											<p>Nombre de la actividad</p>
											<h3>{actividad?.nombre}</h3>
											<p>Tipo de plan</p>
											<p>{actividad?.tipo}</p>
											<p>Comunidad</p>
											<p>{actividad?.comunidad}</p>
											{provinciasConId.map(prov => {
												if (prov._id === actividad?.provinciaId) {
													return (
														<>
															<p>Provincia</p>
															<p>{prov.nombre}</p>
															<p>Provincia</p>
															<p>{prov.imagenBandera}</p>
														</>
													);
												}
											})}
										</article>
									</>
								);
						  })
						: actividades &&
						  actividades.map(actividad => {
								return (
									<>
										<article>
											<img src={actividad?.img} />
											<p>Nombre de la actividad</p>
											<h3>{actividad?.nombre}</h3>
											<p>Tipo de plan</p>
											<p>{actividad?.tipo}</p>
											<p>Comunidad</p>
											<p>{actividad?.comunidad}</p>
											{provinciasConId.map(prov => {
												if (prov._id === actividad?.provinciaId) {
													return (
														<>
															<p>Provincia</p>
															<p>{prov.nombre}</p>
															<p>Provincia</p>
															<p>{prov.imagenBandera}</p>
														</>
													);
												}
											})}
										</article>
									</>
								);
						  })}
				</div>
			</section>
		</>
	);
};

export default Home;
