// Header

import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <h3>Maravillas de España</h3>
            <nav>
                <div className="login">
                    <Link to="/login">Log in</Link>
                </div>
                <div className="registrarse">
                    <Link to="/signup">Regístrate</Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;
