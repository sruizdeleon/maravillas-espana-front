import React from 'react'

const Comment = ({ comentario }) => {
    return (
        <div className="comentario">
            <div className="perfil-usuario">
                <h3 className="nombre-usuario">{comentario.usuario.name}</h3>
            </div>
            <div className="puntaje-usuario">
                <span>{comentario.valoracion}/5.0</span>
            </div>
            <p className="comentario-texto">{comentario.comentario}</p>
        </div>
    )
}

export default Comment