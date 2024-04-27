import CommunityInput from './communityInput/CommunityInput';
import ProvinceInput from './provinceInput/ProvinceInput';
import PlanInput from './planInput/PlanInput';
import './Searcher.css'
import { useEffect, useState } from 'react';

const Searcher = ({
	datos,
	onLimpiarInput,
	existeBusqueda,
	provincias,
	comunidades,
	onCambioEnComunidad,
	onCambioEnProvincia,
	onCambioEnPlan,
	comunidadInputDesactivado,
	provinciaInputDesactivado,
	buscarActividades,
}) => {

	const [currentImage, setCurrentImage] = useState(0);

	const images = [
		"https://www.spain.info/.content/imagenes/cabeceras-grandes/naturaleza/castellfollit-de-la-roca-girona-s1419125804.jpg",
		"https://www.spain.info/.content/imagenes/cabeceras-grandes/cataluna/palafrugell-girona-s144973225.jpg",
		"https://www.spain.info/.content/imagenes/cabeceras-grandes/parques-nacionales/pn-aiguestortes-s1556525279.jpg",
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImage(prevImage => (prevImage - 1 + images.length) % images.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<section
			className="searcher {existeBusqueda? search__part-screen : search__full-scree}"
			style={
				existeBusqueda
					? { height: "fit-content", backgroundColor: "white" }
					: {
							height: "calc(100vh - 90px)",
							backgroundImage: `url(${images[currentImage]})`,
					  }
			}
		>
			{
				existeBusqueda ?
					"" :
					<>
						<div className='searcher__background'></div>
						<h1 className='searcher__title'>¿Qué te gustaría descubrir?</h1>
					</>
			}
			<form className="searcher__form">
				<CommunityInput
					datos={datos}
					onLimpiarInput={onLimpiarInput}
					comunidades={comunidades}
					onCambioEnComunidad={onCambioEnComunidad}
					comunidadInputDesactivado={comunidadInputDesactivado}
				></CommunityInput>
				<ProvinceInput
					datos={datos}
					provincias={provincias}
					onLimpiarInput={onLimpiarInput}
					onCambioEnProvincia={onCambioEnProvincia}
					provinciaInputDesactivado={provinciaInputDesactivado}
				></ProvinceInput>
				<PlanInput datos={datos} onLimpiarInput={onLimpiarInput} onCambioEnPlan={onCambioEnPlan}></PlanInput>
				{/* BUTTON BUSCAR */}
				<button className="searcher__button" type="button" onClick={buscarActividades}>
					<div className="searcher__button-icon">
						<svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" class="bi bi-search" viewBox="0 0 16 16">
							<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
						</svg>
					</div>
					Buscar
				</button>
			</form>
		</section>
	);
};

export default Searcher
