import './Home.css'
import { useEffect, useState } from 'react';
import comunidadesData from '../../models/Comunidades.json';
import provinciasData from '../../models/Provincias.json';
// import { SessionContext } from "../../contexts/SessionContext";
import axios from 'axios';
import ActivityCard from '../../components/activityCard/ActivityCard';

const Home = () => {
	const DEFAULTDATOS = { comunidad: "", provincia: "", plan: ""}
	const COMUNIDADES = comunidadesData.comunidades;
	const PROVINCIAS = provinciasData.provincias;

	// const { user } = useContext(SessionContext);
	const [actividades, setActividades] = useState([]);
	const [datos, setDatos] = useState(DEFAULTDATOS)
	const [comunidades, setComunidades] = useState(COMUNIDADES);
	const [provincias, setProvincias] = useState(PROVINCIAS)
	const [provinciasConId, setProvinciasConId] = useState("");
	const [comunidadInputDesactivado, setComunidadInputDesactivado] = useState(false)
	const [provinciaInputDesactivado, setProvinciaInputDesactivado] = useState(false)

	console.log("Normales", actividades);
	console.log("Búsqueda", datos);

	useEffect(()=>{
		axios
			.get(
				`http://localhost:3000/api/provincias`
			)
			.then(response => {
				const provinciasConId = response.data.provinciasEncontradas.map((prov)=>{
					return prov
				})
				console.log(provinciasConId);
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
			setComunidadInputDesactivado(false);
			setProvinciaInputDesactivado(false);
			setComunidades(COMUNIDADES);
			setProvincias(PROVINCIAS);
		}
		if(input !== ""){
			setProvinciaInputDesactivado(true)
			let contineComunidad = false;
			COMUNIDADES.map((com)=>{
				if(com.name === input) {
					contineComunidad = true;
					com.provincias && setProvincias(com.provincias);
					setProvinciaInputDesactivado(false);
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
				setComunidadInputDesactivado(false)
				setProvinciaInputDesactivado(false)
				setComunidades(COMUNIDADES)
				setProvincias(PROVINCIAS)
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
		} else if(input === "Plan rural") {
			setDatos({ ...datos, plan: "rural" });
		} else {
			setDatos({ ...datos, plan: "" });
		}
	}

	async function buscarActividades() {
		let idEncontrado;
		console.log(datos.provincia)
		if (datos.provincia !== "") {
			provinciasConId.map(prov => {
				if (datos.provincia === prov.nombre) {
					idEncontrado = prov._id;
				}
			});
		}
		axios
			.get(
				`http://localhost:3000/api/actividades`,{params: {comunidad: datos.comunidad, provincia:idEncontrado, tipo: datos.plan}}
			)
			.then(response => {
				setActividades(response.data.actividadesEncontradas);
			})
			.catch(error => {
				console.log(error);
			});
	}

	return (
		<>
			<section className="searcher">
				<form className="searcher__form">
					{/* INPUT COMUNIDADES */}
					<div className="searcher__container">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-geo-alt-fill"
							viewBox="0 0 16 16"
						>
							<path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
						</svg>
						<div className="searcher__input-container">
							<label className="searcher__label" htmlFor="comunidad">
								Comunidad
							</label>
							<input
								className="searcher__input"
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
								{comunidades.map((comunidad, index) => (
									<option key={index}>{comunidad.name}</option>
								))}
							</datalist>
						</div>
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
							disabled={provinciaInputDesactivado}
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
				<h2>Aquí están los mejores planes</h2>

				<div>
					{/* Bucle con Componente tarjeta actividad */}
					{actividades.length === 0
						? ""
						: actividades.map(actividad => <ActivityCard actividad={actividad}></ActivityCard>)}
				</div>
			</section>
		</>
	);
};

export default Home;
