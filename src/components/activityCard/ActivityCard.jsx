import './ActivityCard'

const ActivityCard = ({actividad}) => {
  return (

    <article>
      <img src={actividad?.img} />
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
