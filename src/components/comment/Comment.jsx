import React from 'react'

const Comment = ({ usuario, valoracion, comentario }) => {
    return (
        <div className="comentario">
            <div className="perfil-usuario">
                <h3 className="nombre-usuario">{usuario}</h3>
            </div>
            <div className="puntaje-usuario">
                <span>{valoracion}/5.0</span>
            </div>
            <p className="comentario-texto">{comentario}</p>
        </div>
    )
}

export default Comment