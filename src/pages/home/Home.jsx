import { useEffect, useState } from 'react';
import comunidadesData from '../../models/Comunidades.json';
import provinciasData from '../../models/Provincias.json';
// import { SessionContext } from "../../contexts/SessionContext";
import axios from 'axios';
import ActivityCard from '../../components/activityCard/ActivityCard';
import { set } from 'react-hook-form';

const Home = () => {
	const DEFAULTDATOS = { comunidad: "", provincia: "", plan: ""}
	const COMUNIDADES = comunidadesData.comunidades;
	const PROVINCIAS = provinciasData.provincias;

	// const { user } = useContext(SessionContext);
	const [actividades, setActividades] = useState([
        {
            "_id": "662380ef38b0c0dd919cadd5",
            "nombre": "Plaza Mayor de Burgos",
            "img": "https://postimg.cc/ZW9f18w6",
            "descripcion": "Disfruta del bullicio y la vida cotidiana en la Plaza Mayor de Burgos, rodeada de edificios históricos y animados cafés.",
            "provincia": {
                "_id": "661cd0dbcab02767690bce6d",
                "nombre": "Burgos"
            },
            "comunidad": "Castilla y Leon",
            "tipo": "ciudad",
            "__v": 0
        },
        {
            "_id": "662380ef38b0c0dd919cadd6",
            "nombre": "Catedral de Burgos",
            "img": "https://postimg.cc/5Qx7GDrt",
            "descripcion": "La Catedral de Santa María de Burgos es un impresionante ejemplo del arte gótico en España. Construida entre los siglos XIII y XVI, es conocida por su majestuosa arquitectura, sus vidrieras espectaculares y sus numerosas esculturas. Es uno de los principales monumentos de Burgos y un importante lugar de peregrinación en el Camino de Santiago.",
            "provincia": {
                "_id": "661cd0dbcab02767690bce6d",
                "nombre": "Burgos"
            },
            "comunidad": "Castilla y Leon",
            "tipo": "ciudad",
            "__v": 0
        }]);
	const [datos, setDatos] = useState(DEFAULTDATOS)
	const [provinciasConId, setProvinciasConId] = useState("");
	const [comunidades, setComunidades] = useState(COMUNIDADES);
	const [comunidadDesactivado, setComunidadDesactivado] = useState(false)
	const [provincias, setProvincias] = useState(PROVINCIAS)
	const [provinciaDesactivada, setProvinciaDesactivada] = useState(false)

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
					<h2>Aquí están los mejores planes</h2>



				<div>
					{/* Bucle con Componente tarjeta actividad */}
					{actividades.length === 0 ?
							"" :
							actividades.map(actividad => 
								<ActivityCard actividad={actividad}></ActivityCard>
							)}
				</div>
			</section>
		</>
	);
};

export default Home;
