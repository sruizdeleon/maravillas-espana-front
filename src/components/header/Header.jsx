// Header

import React from 'react';
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { SessionContext } from "../contexts/SessionContext";
import { useContext } from "react";

const Header = () => {
    const { user, logout } = useContext(SessionContext);
    const navigate = useNavigate();
    const cerrarSesion = () => {
        navigate('/');
        logout();
    }
    return (
        <header>
            <h3>Maravillas de España</h3>
            <nav>
                {user?<div className="login">
                    <Link to="/home">Home</Link>
                </div>: ''}
                {user? '': <div className="login">
                    <Link to="/login">Iniciar Sesión</Link>
                </div>}
                {user? '': <div className="registrarse">
                    <Link to="/signup">Registrar</Link>
                </div>}
                {user && user.role === 'admin' ?<div className="admin-usuarios">
                    <Link to="/admin-usuarios">Admin-usuarios</Link>
                </div>: ''}
                {user? <button onClick={cerrarSesion}><Link className='logout'>Logout</Link></button>: ''}
            </nav>
        </header>
    );
}

export default Header;
