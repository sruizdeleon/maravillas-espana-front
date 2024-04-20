import './ActivityCard.css'

const ActivityCard = ({actividad}) => {
  return (
		<article className="card">
			<div className="card__header">
				<div className="card__aside">
					<p className='card__tag'>Muy buscado</p>
					<svg
            className='card__icon'
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-heart-fill"
						viewBox="0 0 16 16"
					>
						<path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
					</svg>
				</div>
				<img className="card__image" src={actividad?.img} />
			</div>
			<p>Nombre de la actividad</p>
			<h3>{actividad?.nombre}</h3>
			<p>Tipo de plan</p>
			<p>{actividad?.tipo}</p>
			<p>Comunidad</p>
			<p>{actividad?.comunidad}</p>
			<p>Provincia</p>
			<p>{actividad?.provincia.nombre}</p>
		</article>
	);
}

export default ActivityCard
