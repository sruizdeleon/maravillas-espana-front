import { useEffect, useState } from 'react'
import './Activity.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Comment from '../../components/comment/Comment'

const Activity = () => {

    const { id } = useParams()
    /* console.log(id) */

    const [actividad, setActividad] = useState({})

    useEffect(() => {
        const getActivityById = async () => {
            const resultado = await axios.get(`http://localhost:3000/api/actividades/${id}`)
            setActividad(resultado.data.actividadEncontrada)
            /* console.log(resultado.data.actividadEncontrada) */
        }
        getActivityById()
    }, [])

    const [valoraciones, setValoraciones] = useState([]);

    useEffect(() => {
        const getCommentById = async () => {
            const resultado = await axios.get(`http://localhost:3000/api/valoraciones`, {params: {actividad: id}})
            console.log(resultado)
        }
        getCommentById()
    }, [])

    return (
        <div className='actividad-body'>

            {/* Detalles de la actividad */}
            <div className="actividad">

                <div className="titulo-fav">
                    <h1 className="titulo">{actividad.nombre}</h1>
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
                        <img className="mapa-punto" src="../../../assets/map_pointer.svg" alt="pointer" />
                        <p className="prov-com">{actividad.provincia?.nombre}, {actividad.comunidad}</p>
                    </div>
                    <div className='bandera-container'>
                        <img className="bandera" src={actividad.provincia?.imagenBandera} alt={actividad.provincia?.nombre} />
                    </div>
                </div>

                <div className="foto-descripcion">
                    <img className="foto-actividad" src={actividad.img} alt={actividad.nombre} />
                    <p className="descripcion">
                        {actividad.descripcion}
                    </p>
                </div>

            </div>

            <div className="separador"></div>

            <div className="div-rating">
                <span className="rating">4.8</span>
                <span>⭐⭐⭐⭐⭐</span>
                <p className="total-resenas">({valoraciones.length} reseñas)</p>
            </div>

            <div className="comentarios">
                {valoraciones.map((val) => {
                    return (<Comment comentario={val}></Comment>)
                })}

                {/* <div className="comentario">
                    <div className="perfil-usuario">
                        <h3 className="nombre-usuario">Rodrigo Pegasano</h3>
                        <p className="localizacion-usuario">Alicante, España</p>
                    </div>
                    <div className="puntaje-usuario">
                        <span>4.8/5.0</span>
                    </div>
                    <p className="comentario-texto">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo eligendi aut
                        distinctio, eum sapiente iste mollitia adipisci quidem explicabo accusantium delectus sit sint magni
                        laboriosam corporis similique repudiandae nostrum velit?
                    </p>
                </div>

                <div className="comentario">
                    <div className="perfil-usuario">
                        <h3 className="nombre-usuario">Matias Pegasano</h3>
                        <p className="localizacion-usuario">Alicante, España</p>
                    </div>
                    <div className="puntaje-usuario">
                        <span>4.8/5.0</span>
                    </div>
                    <p className="comentario-texto">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo eligendi aut
                        distinctio, eum sapiente iste mollitia adipisci quidem explicabo accusantium delectus sit sint magni
                        laboriosam corporis similique repudiandae nostrum velit?
                    </p>
                </div>

                <div className="comentario">
                    <div className="perfil-usuario">
                        <h3 className="nombre-usuario">Flor Paredes</h3>
                        <p className="localizacion-usuario">Alicante, España</p>
                    </div>
                    <div className="puntaje-usuario">
                        <span>4.8/5.0</span>
                    </div>
                    <p className="comentario-texto">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo eligendi aut
                        distinctio, eum sapiente iste mollitia adipisci quidem explicabo accusantium delectus sit sint magni
                        laboriosam corporis similique repudiandae nostrum velit?
                    </p>
                </div>

                <div className="comentario">
                    <div className="perfil-usuario">
                        <h3 className="nombre-usuario">Lucio Pegasano</h3>
                        <p className="localizacion-usuario">Alicante, España</p>
                    </div>
                    <div className="puntaje-usuario">
                        <span>4.8/5.0</span>
                    </div>
                    <p className="comentario-texto">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo eligendi aut
                        distinctio, eum sapiente iste mollitia adipisci quidem explicabo accusantium delectus sit sint magni
                        laboriosam corporis similique repudiandae nostrum velit?
                    </p>
                </div>

                <div className="comentario">
                    <div className="perfil-usuario">
                        <h3 className="nombre-usuario">Ainhoa Cozar</h3>
                        <p className="localizacion-usuario">Alicante, España</p>
                    </div>
                    <div className="puntaje-usuario">
                        <span>4.8/5.0</span>
                    </div>
                    <p className="comentario-texto">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo eligendi aut
                        distinctio, eum sapiente iste mollitia adipisci quidem explicabo accusantium delectus sit sint magni
                        laboriosam corporis similique repudiandae nostrum velit?
                    </p>
                </div> */}
            </div>
        </div>
    )
}

export default Activity