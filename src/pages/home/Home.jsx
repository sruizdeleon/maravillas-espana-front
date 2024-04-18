import { useEffect, useState } from 'react';
import comunidadesData from '../../models/Comunidades.json';
import provinciasData from '../../models/Provincias.json';
// import { SessionContext } from "../../contexts/SessionContext";
import axios from 'axios';

const Home = () => {
	const DEFAULTDATA = { comunidad: "", provincia: "", plan: ""}
	const COMUNIDADES = comunidadesData.comunidades;
	const PROVINCIAS = provinciasData.provincias;

	// const { user } = useContext(SessionContext);
	const [actividades, setActividades] = useState("");
	const [actividadesFiltradas, setActividadesFiltradas] = useState("");
	const [datos, setDatos] = useState(DEFAULTDATA)
	const [provinciasConId, setProvinciasConId] = useState("");
	const [comunidades, setComunidades] = useState(COMUNIDADES);
	const [comunidadDesactivado, setComunidadDesactivado] = useState(false)
	const [provincias, setProvincias] = useState(PROVINCIAS)
	const [provinciaDesactivada, setProvinciaDesactivada] = useState(false)

	useEffect(()=>{
		axios
			.get(
				`http://localhost:3000/api/provincias`
			)
			.then(response => {
				const provinciasConId = response.data.provinciasEncontradas.map((prov)=>{
					return {provinciaId: prov._id, nombre: prov.nombre}
				})
				console.log(provinciasConId)
				setProvinciasConId(provinciasConId)
			})
			.catch(error => {
				console.log(error);
			});
	}, [])

console.log(datos)
console.log(actividades)

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
		console.log(input)
		if(input === "") {
			if(datos.comunidad === "" && input === "") {
				setDatos({...datos, comunidad: "", provincia: ""})
				setComunidadDesactivado(false)
				setProvinciaDesactivada(false)
				setComunidades(COMUNIDADES)
				setProvincias(PROVINCIAS)
			}
		} else {
			console.log(input);
			setComunidadDesactivado(true);
			let contieneProvincia = false;
			PROVINCIAS.map(prov => {
				if (prov.name === input) {
					contieneProvincia = true;
				}
			});
			if (contieneProvincia) {
				console.log(input);
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
		console.log(e.target.value);
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
			const actividadesPlanCiudad = response.map((actividad) => {
				if(actividad.tipo === "ciudad"){
					return actividad;
				}
			});
			setActividades(actividadesPlanCiudad)
		} else if (datos.plan === "rural") {
			const actividadesPlanRural = response.map(actividad => {
				if(actividad.tipo === "rural"){
					return actividad;
				}
			})
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
		console.log(idEncontrado);
		axios
			.get(
				`http://localhost:3000/api/actividades?${datos.provincia === "" ? "comunidad" : "provinciaId"}=${
					datos.provincia === "" ? datos.comunidad : idEncontrado
				}`
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
					<div>

					{/* FILTROS */}
						<h5>Filtros</h5>
						<form>
							<fieldset>
								<legend>Orden</legend>
								<button type="button">Acendente</button>
								<button type="button">Descendente</button>
							</fieldset>
							<fieldset>
								<legend>Plan</legend>
								<button type="button">Plan de ciudad</button>
								<button type="button">Plan de campo</button>
							</fieldset>
							{/* Sólo si la comunidad tiene más de una provincia.
							Bucle con las provincias de esa comunidad,
							si sólo selecciona una, el resto seleccionada,
							si no selecciona ninguna todas seleccionadas
							para que las persona pueda añadir o quitar de la comunidad */}
						</form>
					</div>
				</div>

				{/* 
				 */}
				<div>
					{/* Bucle con Componente tarjeta actividad */}
					{!actividades
						? ""
						: actividades.map(actividad => {
								<article>
									<img src={actividad.img} />
									<p>Nombre de la actividad</p>
									<h3>{actividad.nombre}</h3>
									<p>Tipo de plan</p>
									<p>{actividad.tipo}</p>
									<p>Comunidad</p>
									<p>{actividad.comunidad}</p>
								</article>;
						  })}
				</div>
			</section>
		</>
	);
};

export default Home;
