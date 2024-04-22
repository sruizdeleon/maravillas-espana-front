import { useContext } from "react";
import axios from "axios";
import { SessionContext } from "../contexts/SessionContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useContext(SessionContext);

  function doLogin(datos) {
    axios
      .post("http://localhost:3000/api/users/login", datos)
      .then((response) => {
        console.log(response.data);
        login({ email: datos.email, token: response.data.token });
      })
      .catch((err) => {
        if (err.response.data.msg === "credenciales no validas") {
          Swal.fire({
            title: '<i class="fa-solid fa-circle-exclamation"></i>',
            html: "Las credenciales no son válidas",
            confirmButtonText: "Aceptar",
          });
        } else {
          console.log(err);
        }
      });
  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-black mb-2">Inicio de Sesión</div>
            <div className="card-body">
              <form onSubmit={handleSubmit(doLogin)}>
                <form className="form-floating mb-2">
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="form-control"
                    id="floatingInputValue"
                    aria-describedby="emailHelp"
                  />
                  <label htmlFor="floatingInputValue" className="form-label">
                    Correo Electrónico
                  </label>
                </form>
                <br></br>
                <form className="form-floating mb-2">
                  <input
                    type="password"
                    {...register("password", { required: true, minLength: 8 })}
                    className="form-control"
                    id="floatingInputValue"
                  />
                  <label htmlFor="floatingInputValue" className="form-label">
                    Contraseña
                  </label>
                  {errors.password?.type === "required" && (
                    <p>La contraseña es obligatoria</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p>La contraseña debe tener 8 caracteres como mínimo</p>
                  )}
                </form>
                <br></br>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Recuérdame
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary text-white pointer"
                >
                  Iniciar Sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
