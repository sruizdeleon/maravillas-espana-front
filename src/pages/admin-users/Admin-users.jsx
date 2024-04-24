
import DeleteUsers from '../../components/deleteUsers/DeleteUser';
import TableAdminUsers from '../../components/tableAdminUsers/TableAdminUsers';
import './Admin-users.css'

export default function AdminUsers(){

    return (
      <>
        <div className="divAdmin">
          <h2 className="divAdmin_h2">Bienvenido Admin</h2>
          <h3 className="divAdmin_h3">
            En este área podrás buscar y borrar los usuarios deseados de la base
            de datos
          </h3>
          <div className="adminUsers">
            <DeleteUsers></DeleteUsers>
            <TableAdminUsers className="listaBuscador"></TableAdminUsers>
          </div>
        </div>
      </>
    );
}