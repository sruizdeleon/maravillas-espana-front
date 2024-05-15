import { useEffect, useState } from "react";
import axios from "axios";
import SearcherAdmin from "../searcherAdmin/SearcherAdmin";
import { useContext } from "react";

import "./TableAdminUsers.css";
import { SessionContext } from "../../contexts/SessionContext";

export default function TableAdminUsers() {
  const { user } = useContext(SessionContext);
  const [users, setUsers] = useState([]);
  const [filtradosUsers, setFiltradosUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users?token=${user.token || ""}`)
      .then((response) => {
        console.log("tablausers", response)
        const foundUsers = response.data.usuariosEncontrados.map((user) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        }));
        setUsers(foundUsers);
      })
      .catch((error) => {
        console.log("Error al obtener los usuarios:", error);
      });
  }, [user.token]);

  function filtradoUsers(texto) {
    let filtroUsers = users.filter((i) => i.name.toLowerCase().includes(texto));
    setFiltradosUsers(filtroUsers);
  }


  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

  const handleResize = () => {
    setAnchoPantalla(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="buscador">
        <SearcherAdmin onFiltrar={filtradoUsers}></SearcherAdmin>
        <div className="tableFoundUsers">
          <table className="tableFoundUsers_table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                {anchoPantalla > 767?<th>Rol Usuario</th> : ''}
              </tr>
            </thead>
            <tbody>
              {(filtradosUsers.length > 0 ? filtradosUsers : users).map((x) => (
                <tr key={x.id}>
                  <td>{x.id}</td>
                  <td>{x.name}</td>
                  <td>{x.email}</td>
                  {anchoPantalla > 767?<td>{x.role}</td> : ''}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}