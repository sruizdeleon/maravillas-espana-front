import React, { useRef, useState } from "react";
import { useContext } from "react";
import { SessionContext } from "../../contexts/SessionContext";
import "./My-profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";

export default function MyProfile() {
  const { user, logout } = useContext(SessionContext);
  const navigate = useNavigate();
  const [avatarImage, setAvatarImage] = useState(null);
  const fileInputRef = useRef(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

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
      const authToken = user.token;
      const userId = user._id;
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
        await axios.delete(
          `http://localhost:3000/api/users/${userId}?token=${authToken}`
        );
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

  const handlePasswordChangeClick = () => {
    setShowPasswordForm(!showPasswordForm); // Mostrar el formulario para el cambio de contraseña
  };
  const handlePasswordChangeSubmit = async (event) => {
    event.preventDefault();
    const password = event.target.elements.password.value;
    const nuevaPassword = event.target.elements.nuevaPassword.value;
    const repetirNuevaPassword =
      event.target.elements.repetirNuevaPassword.value;

    if (nuevaPassword !== repetirNuevaPassword) {
      // Si las contraseñas no coinciden, mostrar mensaje de error
      Swal.fire({
        title: "Error",
        text: "Las contraseñas no coinciden",
        icon: "error",
      });
      return;
    }

    try {
      const authToken = user.token;
      const userId = user._id;
      console.log("token: ", authToken, "userid: ", userId);
      // Petición Axios PUT para cambiar la contraseña
      await axios.patch(
        `http://localhost:3000/api/users/${userId}?token=${authToken}`,
        {
          password,
          nuevaPassword,
          repetirNuevaPassword,
        }
      );
      setShowPasswordForm(false); // Ocultar el formulario después de cambiar la contraseña
      Swal.fire({
        title: "Contraseña modificada",
        text: "Tu contraseña se ha cambiado correctamente",
        icon: "success",
      });
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
    }
  };

  return (
    <>
      <div className="contenedor_mi_perfil">
        <div className="card_mi_perfil">
          <div className="user-profile">
            <div className="avatar-container">
              <img
                className="avatar"
                src={
                  avatarImage
                    ? URL.createObjectURL(avatarImage)
                    : "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg"
                }
                alt="Avatar"
              />
              <div className="avatar-buttons">
                {avatarImage && (
                  <button onClick={deleteImage} className="delete-image">
                    Eliminar imagen
                  </button>
                )}
                <div className="upload-icon" onClick={handleUploadClick}>
                  <FaPlus />
                </div>
              </div>
            </div>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <div className="user-info">
              <h2>Hola de nuevo, {user ? user.nombre : ""}</h2>
              <p className="email">📧: {user ? user.email : ""}</p>
              <p className="myProfile_userRole">👤: {user ? user.role : ""}</p>
            </div>
          </div>
          <div className="options">
            <button className="edit" onClick={handlePasswordChangeClick}>
              {showPasswordForm ? "Volver" : "Modificar contraseña"}
            </button>
            {/* Formulario de cambio de contraseña */}
            {showPasswordForm && (
              <form
                className="formPassword"
                onSubmit={handlePasswordChangeSubmit}
              >
                <input
                  className="inputPassword"
                  type="password"
                  name="password"
                  placeholder="Contraseña Actual"
                  required
                />
                <input
                  className="inputPassword"
                  type="password"
                  name="nuevaPassword"
                  placeholder="Nueva contraseña"
                  required
                />
                <input
                  className="inputPassword"
                  type="password"
                  name="repetirNuevaPassword"
                  placeholder="Repetir nueva contraseña"
                  required
                />
                <button className="newPassword" type="submit">
                  Confirmar contraseña
                </button>
              </form>
            )}
            {!showPasswordForm && (
              <button onClick={borrarUsuario} className="delete">
                Eliminar cuenta
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
