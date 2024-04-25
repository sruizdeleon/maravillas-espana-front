import './ActivityDetails.css'

const ActivityDetails = () => {
    return (
        <div className="actividad">

            <div className="titulo-fav">
                <h1 className="titulo">Tour por el Alcázar Real</h1>
                <div className='btn-edit-delete'>
                    <button className='edit-btn'></button>
                    <button className='delete-btn'></button>
                </div>
            </div>

            <div className="info-actividad">
                <div className="destaque">
                    Muy buscado
                </div>
                <div className="localizacion">
                    <img className="mapa-punto" src="../../../assets/map_pointer.svg" alt="" />
                    <p className="prov-com">Sevilla, Andalucia</p>
                </div>
                <img className="bandera" src="../../../assets/andalucia_flag.svg" alt="" />
            </div>

            <div className="foto-descripcion">
                <img className="foto-actividad" src="../../../assets/imagen_test_actividad.avif" alt="" />
                <p className="descripcion">
                    Contempla la impresionante arquitectura gótica de la Catedral de León, una de las más destacadas de España.
                </p>
            </div>

        </div>
    )
}

export default ActivityDetails