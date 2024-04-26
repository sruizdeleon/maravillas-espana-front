import './Home.css'
import { useEffect, useState } from 'react';
import comunidadesData from '../../models/Comunidades.json';
import provinciasData from '../../models/Provincias.json';
// import { SessionContext } from "../../contexts/SessionContext";
import axios from 'axios';
import ActivityCard from '../../components/activityCard/ActivityCard';
import Searcher from '../../components/searcher/Searcher';

const Home = () => {
	const DEFAULTDATOS = { comunidad: "", provincia: "", plan: ""}
	const COMUNIDADES = comunidadesData.comunidades;
	const PROVINCIAS = provinciasData.provincias;

	// const { user } = useContext(SessionContext);
	const [actividades, setActividades] = useState([]);
	const [datos, setDatos] = useState(DEFAULTDATOS)
	const [comunidades, setComunidades] = useState(COMUNIDADES);
	const [busqueda, setBusqueda] = useState(false);
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

	useEffect(()=>{
		if(actividades?.length > 0) {
			setBusqueda(true);
		} else {
			setBusqueda(false);
		}
	}, [actividades])

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
			<Searcher
				busqueda={busqueda}
				datos={datos}
				provincias={provincias}
				comunidades={comunidades}
				onCambioEnComunidad={onCambioEnComunidad}
				onCambioEnProvincia={onCambioEnProvincia}
				onCambioEnPlan={onCambioEnPlan}
				comunidadInputDesactivado={comunidadInputDesactivado}
				provinciaInputDesactivado={provinciaInputDesactivado}
				buscarActividades={buscarActividades}
			></Searcher>

			{/* RESULTADOS DE BÚSQUEDA */}
			<section className="activities-list">
				<h2 className="activities-list__title">
					{actividades.length > 0 ? (
						datos.provincia !== "" ? (
							<>
								<h2 className="activities-list__title">
									Lo más buscado de {datos.provincia}, {datos.comunidad}
								</h2>
							</>
						) : (
							<>
								<h2 className="activities-list__title">Lo más buscado de {datos.comunidad}</h2>
							</>
						)
					) : (
						""
					)}
				</h2>

				{/* Bucle con Componente tarjeta actividad */}
				<div className="activities-list__list">
					{actividades.length === 0
						? ""
						: actividades.map(actividad => <ActivityCard actividad={actividad}></ActivityCard>)}
				</div>
			</section>
		</>
	);
};

export default Home;
