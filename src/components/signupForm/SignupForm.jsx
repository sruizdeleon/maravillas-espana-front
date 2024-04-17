import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputValidation from "../shared/InputValidacion";
import Swal from "sweetalert2";


import "bootstrap/dist/css/bootstrap.min.css";
import "./SignupForm.css";

export default function SignupForm() {
  //const { t } = useTranslation();

  const [datos, setDatos] = useState({ email: "", password: "", name: ""});
  const navigate = useNavigate();

  function onSignup() {
    // Verifica si las contraseñas coinciden
    if (datos.password !== datos.repetirPassword) {
      console.log("Las contraseñas no coinciden");

      // Mostrar alerta con SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden",
        confirmButtonText: "Aceptar",
      });

      return; // Detiene la función si las contraseñas no coinciden
    }

    axios
      .post("http://localhost:3000/api/users/registrar", datos)
      .then((response) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-black">Regístrate
            <button 
            type="button" 
            className="btn-close position-absolute top-0 end-0 m-1"
            aria-label="Close"
            
            //</div>onClick={() => {}}// Faltaría añadir lógica
          ></button></div>
            <div className="card-body">
            <div className="bienvenido">Bienvenido</div>
              <div className="mb-3 form-floating">
                <input
                  value={datos.name}
                  onChange={(e) => setDatos({ ...datos, name: e.target.value })}
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                />
                <label htmlFor="exampleInputName">Nombre</label>
              </div>
              <div>
                <div className="mb-3 form-floating">
                  <InputValidation
                    rules={[
                      {
                        text: "el formato de email no es válido",
                        fn: (p) =>
                          p.match(
                            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
                          ) !== null,
                      },
                    ]}
                    value={datos.email}
                    onChange={(e) =>
                      setDatos({ ...datos, email: e.target.value })
                    }
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  ></InputValidation>
                  <label htmlFor="exampleInputEmail1">Correo Electrónico</label>
                </div>
                <div className="mb-3 form-floating">
                  <InputValidation
                    rules={[
                      {
                        text: "longitud menor que 8",
                        fn: (p) => p.length >= 8,
                      },
                      { text: "no contiene @", fn: (p) => p.includes("@") },
                    ]}
                    type="password"
                    value={datos.password}
                    onChange={(e) =>
                      setDatos({ ...datos, password: e.target.value })
                    }
                  ></InputValidation>
                  <label htmlFor="exampleInputPassword1">Contraseña</label>
                </div>
                <div className="mb-3 form-floating">
                  <InputValidation
                    type="password"
                    value={datos.repetirPassword}
                    onChange={(e) =>
                      setDatos({ ...datos, repetirPassword: e.target.value })
                    }
                  ></InputValidation>
                  <label htmlFor="exampleInputPassword1">
                    Repetir Contraseña
                  </label>
                </div>
                <button
                  onClick={onSignup}
                  type="submit"
                  className="btn btn-secondary"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
