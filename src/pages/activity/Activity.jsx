import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Rating } from 'primereact/rating';
import { SessionContext } from "../../contexts/SessionContext";
import Swal from 'sweetalert2'
import axios from 'axios'
import Comment from '../../components/comment/Comment'
import './Activity.css'

const Activity = () => {

    const navigate = useNavigate()
    const { user } = useContext(SessionContext)
    const { id } = useParams()
    const [actividad, setActividad] = useState({})
    const [totalValoraciones, setValoraciones] = useState([]);
    const [comentarios, setComentarios] = useState([])
    const [usuarios, setUsuarios] = useState([]);
    const [valoracionUsuarios, setValoracionUsuarios] = useState([]);
    const [mediaValoraciones, setMediaValoraciones] = useState(0);
    const [nuevoComentario, setNuevoComentario] = useState({ actividad: id, usuario: user?._id, valoracion: "", comentario: "" })

    /* console.log(user) */

    /* Actualizar el usuario cuando se recarga la página */
    useEffect(() => {
        setNuevoComentario(actualizarEstado => ({
            ...actualizarEstado,
            usuario: user?._id
        }));
    }, [user]);

    /* Encontrar actividad por ID */
    useEffect(() => {
        const getActivityById = async () => {
            if (user?.token) {
                const resultado = await axios.get(`http://localhost:3000/api/actividades/${id}?token=${user?.token}`)
                setActividad(resultado.data.actividadEncontrada)
                /* console.log(resultado.data.actividadEncontrada) */
            }
        }
        getActivityById()
    }, [id, user?.token])

    /* Encontrar comentario por ID */
    useEffect(() => {
        const getCommentById = async () => {
            if (user?.token) {
                const resultado = await axios.get(`http://localhost:3000/api/valoraciones/?actividad=${id}&token=${user?.token}`)
                console.log(resultado)

                const totalValoraciones = resultado.data.valoracionesDeActividadEncontradas.length
                /* console.log(totalValoraciones) */
                setValoraciones(totalValoraciones)

                const comentarios = resultado.data.valoracionesDeActividadEncontradas.map(val => val.comentario);
                /* console.log(comentarios) */
                setComentarios(comentarios)

                const usuarios = resultado.data.valoracionesDeActividadEncontradas.map(val => val.usuario.name);
                /* console.log(usuarios) */
                setUsuarios(usuarios)

                const valoracionUsuarios = resultado.data.valoracionesDeActividadEncontradas.map(val => val.valoracion);
                /* console.log(valoracionUsuarios) */
                setValoracionUsuarios(valoracionUsuarios)

                const sumaValoraciones = valoracionUsuarios.reduce((a, b) => a + b, 0);
                const media = totalValoraciones > 0 ? sumaValoraciones / totalValoraciones : 0;
                setMediaValoraciones(media);
            }
        }
        getCommentById()
    }, [id, user?.token])

    /* Editar actividad */
    function editarActividad() {
        navigate(`/activity-edit/${actividad._id}`);
    }

    /* Borrar actividad */
    function borrarActividad() {
        console.log(actividad)
        Swal.fire({
            icon: "warning",
            title: "Eliminar actividad",
            text: `¿Quieres eliminar la actividad: ${actividad?.nombre}?`,
            showConfirmButton: true,
            confirmButtonText: "Eliminar",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:3000/api/actividades/${actividad._id}?token=${user.token}`)
                    .then(response => {
                        Swal.fire({
                            icon: "success",
                            title: "Actividad eliminada correctamente",
                        });
                        navigate(-1)
                    })
                    .catch(error => {
                        console.log(error);
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "No se ha podido eliminar la actividad. Prueba de nuevo más tarde.",
                            cancel: "Cerrar",
                        });
                    });
            }
        })
    }

    /* Agregar un nuevo comentario */
    function agregarComentario() {
        axios.post(`http://localhost:3000/api/valoraciones?token=${user.token}`, nuevoComentario)
            .then((response) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "¡Gracias por tu comentario!",
                    showConfirmButton: false,
                    timer: 2000
                })
                setTimeout(() => {
                    location.reload();
                }, 2000);
            })
            .catch((error) => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "No ha sido posible agregar el comentario",
                    timer: 2000
                })
                console.log(error)
            })
    }

    return (
        <div className='actividad-body'>
            {/* Detalles de la actividad */}
            <div className="actividad">

                {/* Título de la actividad y botones de editar y borrar */}
                <div className="titulo-fav">
                    <h1 className="titulo-actividad">{actividad?.nombre}</h1>
                    {
                        user?.role === "admin" ?
                            <div className='btn-edit-delete'>
                                <button onClick={editarActividad} className='edit-btn'></button>
                                <button onClick={borrarActividad} className='delete-btn'></button>
                            </div>
                            :""
                    }
                </div>

                {/* Información de la actividad: Tipo, localización, provincia, comunidad y bandera */}
                <div className="info-actividad">
                    {actividad?.tipo === "ciudad" ?
                        <div className="destaque-ciudad">
                            Plan urbano
                        </div>
                        :
                        <div className="destaque-rural">
                            Plan {actividad?.tipo}
                        </div>
                    }

                    <div className="localizacion">
                        <img className="mapa-punto" src="../../../assets/map_pointer.svg" alt="pointer" />
                        <p className="prov-com">{actividad?.provincia?.nombre}, {actividad?.comunidad}</p>
                    </div>
                    <div className='bandera-container'>
                        <img className="bandera" src={actividad?.provincia?.imagenBandera} alt={actividad?.provincia?.nombre} />
                    </div>
                </div>

                {/* Descripción de la actividad */}
                <div className="foto-descripcion">
                    <img className="foto-actividad" src={actividad?.img} alt={actividad?.nombre} />
                    <p className="descripcion-titulo">Descripción:</p>
                    <p className="descripcion">
                        {actividad?.descripcion}
                    </p>
                </div>
            </div>

            <div className="separador"></div>

            {/* Formulario para agregar un nuevo comentario */}
            <form className="formComentario">
                <h3 className='form-titulo'>¡Cuéntanos cómo fue tu experiencia!</h3>
                <fieldset>
                    <input
                        value={nuevoComentario.actividad}
                        onChange={(e) => setNuevoComentario({ ...nuevoComentario, actividad: e.target.value })}
                        type="hidden"
                        name='actividad'
                    />
                </fieldset>
                <fieldset>
                    <input
                        value={nuevoComentario.usuario}
                        onChange={(e) => setNuevoComentario({ ...nuevoComentario, usuario: e.target.value })}
                        type="hidden"
                        name='nombre'
                    />
                </fieldset>
                <fieldset>
                    <p className='form-usuario'>{user?.nombre}</p>
                    <div className='valorar-estrellas'>
                        <label htmlFor="valoracion">¿Qué te ha parecido?</label>
                        <Rating
                            className='form-estrellas'
                            offIcon={<img className='offIcon-star' src={"../../../assets/star_regular.svg"} alt="" width="25px" height="25px" />}
                            onIcon={<img className='onIcon-star' src={"../../../assets/star_solid.svg"} alt="" width="25px" height="25px" />}
                            value={nuevoComentario.valoracion}
                            onChange={(e) => setNuevoComentario({ ...nuevoComentario, valoracion: e.target.value })}
                            cancel={false}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <textarea
                        className='formComentario-textarea'
                        value={nuevoComentario.comentario}
                        onChange={(e) => setNuevoComentario({ ...nuevoComentario, comentario: e.target.value })}
                        name="comentario"
                        placeholder='Describe tu experiencia...'
                    />
                </fieldset>

                <button className='btn-form-comentario' onClick={agregarComentario} type='button'>
                    Agregar comentario
                </button>
            </form>

            <div className="separador"></div>

            {/* Promedio de las valoraciones y numero de reseñas */}
            <div className="div-rating">
                <div className="media-fija">
                    <span className="rating">{mediaValoraciones !== 0 ? mediaValoraciones.toFixed(1) : "0"}</span>
                    <Rating className='estrellas-color' value={mediaValoraciones} readOnly cancel={false} />
                </div>
                <p className="total-resenas">({totalValoraciones} reseñas)</p>
            </div>

            {/* Sección de comentarios */}
            <div className="comentarios">
                {comentarios.map((comentario, index) => (
                    <Comment
                        key={index}
                        comentario={comentario}
                        usuario={usuarios[index]}
                        valoracion={valoracionUsuarios[index]}
                    />
                ))}
            </div>
        </div>
    )
}

export default Activity