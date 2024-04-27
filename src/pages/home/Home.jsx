import "./Home.css";
import { useContext, useEffect, useState } from "react";
import comunidadesData from "../../models/Comunidades.json";
import provinciasData from "../../models/Provincias.json";
import { SessionContext } from "../../components/contexts/SessionContext";
import axios from "axios";
import ActivityCard from "../../components/activityCard/ActivityCard";
import Searcher from "../../components/searcher/Searcher";
import Swal from "sweetalert2";
import { useNavigate, useSearchParams } from "react-router-dom";

const Home = () => {
	// Importación de datos
	const DEFAULTDATOS = { comunidad: "", provincia: "", plan: "" };
	const COMUNIDADES = comunidadesData.comunidades;
	const PROVINCIAS = provinciasData.provincias;

	// Variables y contextos
	const navigate = useNavigate();
	const { user, setActividadForm } = useContext(SessionContext);
	const [searchParams, setSearchParams] = useSearchParams();
	const [actividades, setActividades] = useState([]);
	const [datos, setDatos] = useState(DEFAULTDATOS);
	const [comunidades, setComunidades] = useState(COMUNIDADES);
	const [provincias, setProvincias] = useState(PROVINCIAS);
	const [provinciasConId, setProvinciasConId] = useState([]);
	const [comunidadInputDesactivado, setComunidadInputDesactivado] = useState(false);
	const [provinciaInputDesactivado, setProvinciaInputDesactivado] = useState(false);

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

	useEffect(() => {
		if(!provinciasConId.length) return
		const tipo = searchParams.get("tipo");
		const comunidad = searchParams.get("comunidad");
		const provincia = searchParams.get("provincia");

		setDatos({ tipo: tipo ?? "", comunidad: comunidad ?? "", provincia: provincia ?? ""  });

		if (tipo || comunidad || provincia) {
			let provinciaId = ""
			if(provincia){
				provinciaId = provinciasConId.find(x=>x.nombre === provincia)
			}
			buscarActividades(tipo === "undefined" ? "" : tipo, comunidad === "undefined" ? "" : comunidad, provinciaId);
		}
		else{
			setActividades([])
		}
	}, [searchParams,provinciasConId]);

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

	function onCambioEnPlan(e) {
		const input = String(e.target.value);
		if (input === "Plan de ciudad") {
			setDatos({ ...datos, plan: "ciudad" });
		} else if (input === "Plan rural") {
			setDatos({ ...datos, plan: "rural" });
		} else {
			setDatos({ ...datos, plan: "" });
		}
	}

	function crearActividad() {
		navigate(`/activity-create`);
	}

	function editarActividad(actividad) {
		navigate(`/activity-edit/${actividad._id}`);
	}

	function borrarActividad(actividad) {
		Swal.fire({
			icon: "warning",
			title: "Eliminar actividad",
			text: `¿Quieres eliminar la actividad: ${actividad.nombre}?`,
			showConfirmButton: true,
			confirmButtonText: "Eliminar",
			showCancelButton: true,
			cancelButtonText: "Cancelar",
		}).then(result => {
			if (result.isConfirmed) {
				axios
					.delete(`http://localhost:3000/api/actividades/${actividad._id}`)
					.then(response => {
						setActividades(actividades.filter(act => act._id !== actividad._id));
						Swal.fire({
							icon: "success",
							title: "Actividad eliminada correctamente",
						});
					})
					.catch(error => {
						console.log(error);
						Swal.fire({
							icon: "error",
							title: "Error",
							text: `No se ha podido eliminar la actividad. Error: ${error}.`,
							cancel: "Cerrar",
						});
					});
			}
		});
	}

	function aplicarFiltro() {
		navigate({
			pathname: "/home",
			search: `?comunidad=${datos.comunidad}&provincia=${datos.provincia}&tipo=${datos.plan}`,
		});
	}

	async function buscarActividades(tipo, comunidad, provincia) {
		axios
			.get(`http://localhost:3000/api/actividades`, {
				params: { comunidad: comunidad, provincia: provincia, tipo: tipo },
			})
			.then(response => {
				setActividades(response.data.actividadesEncontradas);
			})
			.catch(error => {
				Swal.fire({
					icon: "error",
					title: "Error",
					text: `No se ha podido eliminar la actividad. Error: ${error}.`,
					cancel: "Cerrar",
				});
				console.log(error);
			});
	}

	return (
		<>
			<Searcher
				datos={datos}
				existeBusqueda={actividades.length > 0 ? true : false}
				provincias={provincias}
				comunidades={comunidades}
				onCambioEnComunidad={onCambioEnComunidad}
				onCambioEnProvincia={onCambioEnProvincia}
				onCambioEnPlan={onCambioEnPlan}
				comunidadInputDesactivado={comunidadInputDesactivado}
				provinciaInputDesactivado={provinciaInputDesactivado}
				buscarActividades={aplicarFiltro}
			></Searcher>

			{user.role === "admin" ? (
				<button type="button" onClick={crearActividad}>
					Crear una actividad
				</button>
			) : (
				""
			)}

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
						: actividades.map((actividad, i) => (
								<ActivityCard
									key={i}
									onEditarActividad={editarActividad}
									onBorrarActividad={borrarActividad}
									actividad={actividad}
								></ActivityCard>
						  ))}
				</div>
			</section>
		</>
	);
};

export default Home;
