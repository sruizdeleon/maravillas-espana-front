import { useNavigate } from 'react-router-dom'
import "./ActivityCard.css";
import Paragraph from "../shared/Paragraph";
import { useContext, useEffect } from 'react';
import { SessionContext } from "../../contexts/SessionContext";

const ActivityCard = ({ actividad, onBorrarActividad, onEditarActividad }) => {

	const navigate = useNavigate()
	const { user } = useContext(SessionContext)

	return (
		<article className="activity-card">
			<div className="activity-card__header" style={{ backgroundImage: `url(${actividad?.img})` }}>
				<div className="activity-card__aside">
					{actividad.tipo === "ciudad" ? (
						<p className="activity-card__tag activity-card__tag-city">Plan urbano</p>
					) : (
						<p className="activity-card__tag activity-card__tag-country">Plan {actividad.tipo}</p>
					)}
				</div>
			</div>
			<div className="activity-card__body">
				<Paragraph className="activity-card__title" text={actividad.nombre} maxLength={40}></Paragraph>
				<Paragraph className="activity-card__description" text={actividad.descripcion} maxLength={120}></Paragraph>
			</div>
			<div className="activity-card__footer">
				<button
					type="button"
					onClick={() => navigate(`/activity/${actividad._id}`)}
					className="activity-card__button-see-more"
				>
					Ver más
				</button>
				<div className="activity-card__container-province">
					<img className="activity-card__img-province" src={actividad?.provincia?.imgenBandera}></img>
					<p className="activity-card__province">
						{actividad?.provincia?.nombre === "Santa Cruz de Tenerife" ? "Tenerife" : actividad?.provincia?.nombre === "Principado de Asturias" ? "Asturias" : actividad?.provincia?.nombre}
					</p>
				</div>
			</div>
			{user.role === "admin" ? (
				<div className="activity-card__admin">
					<button
						className="activity-card__admin-button activity-card__admin-button--edit"
						onClick={() => onEditarActividad(actividad)}
					>
						✏️
					</button>
					<button
						className="activity-card__admin-button activity-card__admin-button--delete"
						onClick={() => onBorrarActividad(actividad)}
					>
						🗑️
					</button>
				</div>
			) : (
				""
			)}
		</article>
	);
};

export default ActivityCard;
