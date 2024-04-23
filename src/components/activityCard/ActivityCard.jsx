import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import "./ActivityCard.css";

const ActivityCard = ({ actividad }) => {

	const [titulo, setTitulo] = useState("")
	const [descripcion, setDescripcion] = useState("")

	useEffect(()=>{
		if(actividad) {
			setTitulo(recortarTexto(actividad.nombre, 58))
			setDescripcion(recortarTexto(actividad.descripcion, 120));
		}
	},[])

	function recortarTexto(texto, longitud) {
		if (texto.length > longitud) {
			return (texto.slice(0, (longitud - 3)) + "...");
		} else {
			return texto
		}
	}

	return (
		<article className="activity-card">
			<div className="activity-card__header" style={{ backgroundImage: `url(${actividad?.img})` }}>
				<div className="activity-card__aside">
					<p className="activity-card__tag">Plan de {actividad.tipo}</p>
					<svg
						className="activity-card__icon"
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-heart"
						viewBox="0 0 16 16"
					>
						<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
					</svg>
				</div>
				{/* <img className="activity-card__image" src={actividad?.img} /> */}
			</div>
			<div className="activity-card__body">
				<h3 className="activity-card__title">{titulo}</h3>
				<p className="activity-card__description">{descripcion}</p>
			</div>
			<div className="activity-card__footer">
				<Link to={actividad._id}>
					<button className="activity-card__button-see-more">Ver más</button>
				</Link>
				<div className="activity-card__container-province">
					<img className="activity-card__img-province" src={actividad?.provincia.imgenBandera}></img>
					<p className="activity-card__province">{actividad?.provincia.nombre}</p>
				</div>
			</div>
		</article>
	);
};

export default ActivityCard;
