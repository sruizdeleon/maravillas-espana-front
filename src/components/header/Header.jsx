// Header

import React from 'react';
import './Header.css'

const Header = () => {
    return (
        <header>
            <h3>Maravillas de España</h3>
            <nav>
                <div className="login">Log in</div>
                <div className="registrarse">Regístrate</div>
            </nav>
        </header>
    );
}

export default Header;
