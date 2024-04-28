import React from 'react'

const PlanInput = ({ onCambioEnPlan, datos, onLimpiarInput }) => {
	return (
		<div className="searcher__container">
			<div className="searcher__icon-container">
				<svg
					className="searcher__icon"
					xmlns="http://www.w3.org/2000/svg"
					fill="#666666"
					class="bi bi-lightning-charge-fill"
					viewBox="0 0 16 16"
				>
					<path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
				</svg>
			</div>
			<div className="searcher__input-container">
				<label className="searcher__label" htmlFor="plan">
					Tipo de plan
				</label>
				<div className="searcher__contianer--close">
					<input
						className="searcher__input"
						id="plan"
						name="plan"
						multiple
						list="lista-planes"
						value={datos.tipo === "ciudad" ? "Plan de ciudad" : datos.tipo === "rural" ? "Plan rural" : ""}
						placeholder="Tipo de plan"
						onChange={e => onCambioEnPlan(String(e.target.value))}
					></input>
					<datalist id="lista-planes">
						<option>Plan de ciudad</option>
						<option>Plan rural</option>
					</datalist>
					{
						datos.tipo === ""
						?	""
						: <button className="searcher__button-clean" type="button" onClick={() => onLimpiarInput("tipo")}>
						X
					</button>
					}
				</div>
			</div>
		</div>
	);
};

export default PlanInput
