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
                {user?<div className="home">
                    <Link className='link' to="/home">Home</Link>
                </div>: ''}
                {user? '': <div className="login">
                    <Link className='link' to="/login">Iniciar Sesión</Link>
                </div>}
                {user? '': <div className="registrarse">
                    <Link className='link' to="/signup">Registrar</Link>
                </div>}
                {user && user.role === 'admin' ?<div className="admin-usuarios">
                    <Link className='link' to="/admin-usuarios">Admin-usuarios</Link>
                </div>: ''}
                {user?<div className="mi-perfil">
                    <Link className='link' to="/mi-perfil">Mi Perfil</Link>
                </div>: ''}
                {user? <div className='logout'onClick={cerrarSesion}><Link className='link'>Logout</Link></div>: ''}
            </nav>
        </header>
    );
}

export default Header;
