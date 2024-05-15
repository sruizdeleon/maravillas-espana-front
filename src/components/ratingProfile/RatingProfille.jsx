import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SessionContext } from "../../contexts/SessionContext";
import "./RatingProfile.css";
import { useNavigate } from "react-router-dom";

export default function RatingProfile() {
  const { user } = useContext(SessionContext);
  const [valoraciones, setValoraciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarValoraciones, setMostrarValoraciones] = useState(false);
  const [mostrarBotonVolver, setMostrarBotonVolver] = useState(false);
  const navigate = useNavigate();

  const fetchValoraciones = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/valoraciones?usuario=${user._id}`
      );
      setValoraciones(response.data.valoracionesDeUsuarioEncontradas);
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.error("Error al obtener las valoraciones:", error);
      setError(
        "Hubo un error al obtener las valoraciones. Inténtalo de nuevo más tarde."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mostrarValoraciones) {
      fetchValoraciones();
      setMostrarBotonVolver(true);
    }
  }, [mostrarValoraciones]);

  const handleVerTodasValoraciones = () => {
    navigate("/mis-valoraciones");
    setMostrarValoraciones(true);
  };

  const handleVolverAMiPerfil = () => {
    navigate("/mi-perfil");
  };

  return (
    <>
     {mostrarBotonVolver && ( // Mostrar el botón solo cuando se ha hecho clic en "Mis valoraciones"
                <button className="button view" onClick={handleVolverAMiPerfil}>Volver a mi perfil</button>
            )}
            <button className="button view" onClick={handleVerTodasValoraciones}>Mis valoraciones</button>
      {mostrarValoraciones && (
        <div className="valoraciones-container">
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              {valoraciones.length > 0 ? (
                valoraciones.map((valoracion) => (
                  <div key={valoracion._id} className="valoracion-card">
                    <p className="valoracion">Comentario: {valoracion.comentario}</p>
                    <p> {valoracion.valoracion}</p>
                  </div>
                ))
              ) : (
                <p>No hay valoraciones disponibles</p>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
