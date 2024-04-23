import React from 'react'
import CommunityInput from './communityInput/CommunityInput';
import ProvinceInput from './provinceInput/ProvinceInput';
import PlanInput from './planInput/PlanInput';
import './Searcher.css'

const Searcher = ({
	datos,
	busqueda,
	provincias,
	comunidades,
	onCambioEnComunidad,
	onCambioEnProvincia,
	onCambioEnPlan,
	comunidadInputDesactivado,
	provinciaInputDesactivado,
	buscarActividades,
}) => {
	return (
		<section
			className="searcher"
			style={
				busqueda
					? { height: "fit-content" }
					: {
							height: "calc(100vh - 154px)",
							transitionProperty: "height",
							transitionDuration: "1s",
							transitionTimingFunction: "linear",
					  }
			}
		>
			<form className="searcher__form">
				<CommunityInput
					datos={datos}
					comunidades={comunidades}
					onCambioEnComunidad={onCambioEnComunidad}
					comunidadInputDesactivado={comunidadInputDesactivado}
				></CommunityInput>

				<ProvinceInput
					provincias={provincias}
					onCambioEnProvincia={onCambioEnProvincia}
					provinciaInputDesactivado={provinciaInputDesactivado}
				></ProvinceInput>

				<PlanInput onCambioEnPlan={onCambioEnPlan}></PlanInput>

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
