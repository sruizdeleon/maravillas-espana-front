import React, { useRef, useState } from "react";
import { useContext } from "react";
import { SessionContext } from "../../components/contexts/SessionContext";
import "./My-profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function MyProfile() {
  const { user, logout } = useContext(SessionContext);
  const navigate = useNavigate();
  const [avatarImage, setAvatarImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setAvatarImage(file);
  };

  const deleteImage = () => {
    setAvatarImage(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const borrarUsuario = async () => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará tu cuenta. ¿Quieres continuar?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3000/api/users/${user._id}`);
        console.log("Usuario eliminado");
        Swal.fire({
          title: "Cuenta eliminada",
          text: "Esperamos volver a verte pronto",
          icon: "success",
        });
        logout();
        navigate("/signup");
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <>
      <div className="contenedor">
        <div className="user-profile">
        <div className="avatar-container">
        <img
              className="avatar"
              src={avatarImage ? URL.createObjectURL(avatarImage) : "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg"}
              alt="Avatar"
            />
            {avatarImage && (
              <button onClick={deleteImage} className="delete-image">Eliminar imagen</button>
            )}
            <div className="upload-icon" onClick={handleUploadClick}>
              <FaPlus />
            </div>
          </div>
          <input type="file" onChange={handleImageChange} accept="image/*" ref={fileInputRef} style={{ display: "none" }} />
          <div className="user-info">
            <h2>Bienvenida, {user ? user.nombre : ""}</h2>
            <p className="email">📧: {user ? user.email : ""}</p>
            <p>👤: {user ? user.role : ""}</p>
          </div>
        </div>
        <div className="options">
          <button className="edit">Modificar contraseña</button>
          <button onClick={borrarUsuario} className="delete">
            Eliminar cuenta
          </button>
        </div>
      </div>
    </>
  );
}
