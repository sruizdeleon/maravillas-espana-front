import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Rating } from 'primereact/rating';
import { SessionContext } from '../../components/contexts/SessionContext';
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
    const [nuevoComentario, setNuevoComentario] = useState({ actividad: "", usuario: "", valoracion: "", comentario: "" })

    console.log(user)

    /* Encontrar actividad por ID */
    useEffect(() => {
        const getActivityById = async () => {
            const resultado = await axios.get(`http://localhost:3000/api/actividades/${id}`)
            setActividad(resultado.data.actividadEncontrada)
            console.log(resultado.data.actividadEncontrada)
        }
        getActivityById()
    }, [])

    /* Encontrar comentario por ID */
    useEffect(() => {
        const getCommentById = async () => {
            const resultado = await axios.get(`http://localhost:3000/api/valoraciones`, { params: { actividad: id } })
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
        getCommentById()
    }, [])

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
                    .delete(`http://localhost:3000/api/actividades/${actividad._id}`)
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
        axios.post(`http://localhost:3000/api/valoraciones`, nuevoComentario)
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "¡Gracias por tu comentario!",
                    showConfirmButton: false,
                    timer: 2000
                })
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
                    <h1 className="titulo">{actividad?.nombre}</h1>
                    <div className='btn-edit-delete'>
                        <button onClick={editarActividad} className='edit-btn'></button>
                        <button onClick={borrarActividad} className='delete-btn'></button>
                    </div>
                </div>

                {/* Información de la actividad: Tipo, localización, provincia, comunidad y bandera */}
                <div className="info-actividad">
                    <div className="destaque">
                        Muy buscado
                    </div>
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
                    <p className="descripcion">
                        {actividad?.descripcion}
                    </p>
                </div>
            </div>

            <div className="separador"></div>

            {/* Formulario para agregar un nuevo comentario */}
            <form className="formComentario">
                <h3>¡Cuéntanos como fue tu experiencia!</h3>
                <fieldset>
                    <input
                        value={actividad?._id}
                        onChange={(e) => setNuevoComentario({ ...nuevoComentario, actividad: e.target.value })}
                        type="hidden"
                        name='actividad'
                    />
                </fieldset>
                <fieldset>
                    <input
                        value={user?._id}
                        onChange={(e) => setNuevoComentario({ ...nuevoComentario, usuario: e.target.value })}
                        type="text"
                        name='nombre'
                        readOnly
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="valoracion"></label>
                    <Rating
                        className='estrellas-color'
                        value={nuevoComentario.valoracion}
                        onChange={(e) => setNuevoComentario({ ...nuevoComentario, valoracion: e.target.value })}
                        cancel={false}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="nombre">Comentario</label>
                    <textarea
                        value={nuevoComentario.comentario}
                        onChange={(e) => setNuevoComentario({ ...nuevoComentario, comentario: e.target.value })}
                        name="comentario"
                        cols="50"
                        rows="10">
                    </textarea>
                </fieldset>

                <button onClick={agregarComentario} type='submit'>
                    Agregar comentario
                </button>
                {console.log(nuevoComentario)}
            </form>

            {/* Promedio de las valoraciones y total de reseñas */}
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