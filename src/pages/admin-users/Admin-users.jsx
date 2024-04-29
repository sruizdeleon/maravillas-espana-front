
import DeleteUsers from '../../components/deleteUsers/DeleteUser';
import TableAdminUsers from '../../components/tableAdminUsers/TableAdminUsers';
import './Admin-users.css'

export default function AdminUsers(){

    return (
      <>
        <div className="Admin">
         <div className='Admin_tarjeta'>
         <img src="https://i.postimg.cc/05MZ0dV1/admin.jpg" alt="img-Admin" className="imgAdmin"/>
         <h2 className="Admin_h2">Bienvenido Admin</h2>
          <h3 className="Admin_h3">
            En este área podrás buscar y borrar los usuarios deseados de la base
            de datos
          </h3>
          <div className="adminUsers">
            <DeleteUsers></DeleteUsers>
            <TableAdminUsers className="listaBuscador"></TableAdminUsers>
          </div>
        </div>
         </div>
          
      </>
    );
}