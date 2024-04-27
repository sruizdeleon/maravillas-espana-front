import { useEffect, useState } from 'react'
import './Activity.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Comment from '../../components/comment/Comment'
import Swal from 'sweetalert2'

const Activity = () => {

    const navigate = useNavigate()

    const { id } = useParams()
    /* console.log(id) */

    const [actividad, setActividad] = useState({})

    useEffect(() => {
        const getActivityById = async () => {
            const resultado = await axios.get(`http://localhost:3000/api/actividades/${id}`)
            setActividad(resultado.data.actividadEncontrada)
            console.log(resultado.data.actividadEncontrada)
        }
        getActivityById()
    }, [])

    const [totalValoraciones, setValoraciones] = useState([]);
    const [comentarios, setComentarios] = useState([])
    const [usuarios, setUsuarios] = useState([]);
    const [valoracionUsuarios, setValoracionUsuarios] = useState([]);
    const [mediaValoraciones, setMediaValoraciones] = useState(0);

    useEffect(() => {
        const getCommentById = async () => {
            const resultado = await axios.get(`http://localhost:3000/api/valoraciones`, { params: { actividad: id } })

            const totalValoraciones = resultado.data.valoracionesDeActividadEncontradas.length
            console.log(totalValoraciones)
            setValoraciones(totalValoraciones)

            const comentarios = resultado.data.valoracionesDeActividadEncontradas.map(val => val.comentario);
            console.log(comentarios)
            setComentarios(comentarios)

            const usuarios = resultado.data.valoracionesDeActividadEncontradas.map(val => val.usuario.name);
            console.log(usuarios)
            setUsuarios(usuarios)

            const valoracionUsuarios = resultado.data.valoracionesDeActividadEncontradas.map(val => val.valoracion);
            console.log(valoracionUsuarios)
            setValoracionUsuarios(valoracionUsuarios)

            const sumaValoraciones = valoracionUsuarios.reduce((a, b) => a + b, 0);
            const media = totalValoraciones > 0 ? sumaValoraciones / totalValoraciones : 0;
            setMediaValoraciones(media);
        }
        getCommentById()
    }, [])

    function editarActividad() {
        navigate(`/activity-edit/${actividad._id}`);
    }

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
                        navigate("/home")
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

    return (
        <div className='actividad-body'>

            {/* Detalles de la actividad */}
            <div className="actividad">

                <div className="titulo-fav">
                    <h1 className="titulo">{actividad?.nombre}</h1>
                    <div className='btn-edit-delete'>
                        <button onClick={editarActividad} className='edit-btn'></button>
                        <button onClick={borrarActividad} className='delete-btn'></button>
                    </div>
                </div>

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

                <div className="foto-descripcion">
                    <img className="foto-actividad" src={actividad?.img} alt={actividad?.nombre} />
                    <p className="descripcion">
                        {actividad?.descripcion}
                    </p>
                </div>

            </div>

            <div className="separador"></div>

            <div className="div-rating">
                <span className="rating">{mediaValoraciones.toFixed(1)}</span>
                <span>⭐⭐⭐⭐⭐</span>
                <p className="total-resenas">({totalValoraciones} reseñas)</p>
            </div>

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