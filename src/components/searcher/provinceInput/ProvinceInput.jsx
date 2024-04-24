import React from 'react'

const ProvinceInput = ({
	provincias,
	onCambioEnProvincia,
	provinciaInputDesactivado,
}) => {
  return (
		<div className="searcher__container searcher__container--border">
			<div className="searcher__icon-container">
				<svg
					className="searcher__icon"
					xmlns="http://www.w3.org/2000/svg"
					fill="#666666"
					class="bi bi-geo-alt-fill"
					viewBox="0 0 16 16"
				>
					<path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
				</svg>
			</div>
			<div className="searcher__input-container">
				<label className="searcher__label" htmlFor="provincia">
					Provincia
				</label>
				<input
					className="searcher__input"
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
		</div>
	);
}

export default ProvinceInput
