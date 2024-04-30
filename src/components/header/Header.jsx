// Header
import React from 'react';
import './Header.css'
import { IoHome } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AiOutlineLogin } from "react-icons/ai";
import { GiArchiveRegister } from "react-icons/gi";
import { HiBars4 } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom'
import { SessionContext } from  "../../contexts/SessionContext"
import { useContext } from "react";
import { useState, useEffect } from 'react';

const Header = () => {

  const { user, logout } = useContext(SessionContext);
  const navigate = useNavigate();
  const cerrarSesion = () => {
    navigate("/");
    logout();
  };

  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

  const handleResize = () => {
    setAnchoPantalla(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let tamañoMovil = false;
  if(anchoPantalla > 767){
    tamañoMovil = false
  } else{
    tamañoMovil = true
  }

  
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuClick = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <header>
      <h1 className="header_h1"><img src="https://i.postimg.cc/RhPPx18k/maravillas-espana-black.png" alt="logo" className='logoHeader'/></h1>
      <nav className="navGlobal">
        <div className="navLanding">
          {user ? (
            ""
          ) : (
            <div className="login">
              <Link className="link-landing" to="/login">
                <i className="iconosNav">
                  <AiOutlineLogin />
                </i>
                Iniciar Sesión
              </Link>
            </div>
          )}
          {user ? (
            ""
          ) : (
            <div className="registrarse">
              <Link className="link-landing" to="/signup">
                <i className="iconosNav">
                  <GiArchiveRegister />
                </i>
                Registrar
              </Link>
            </div>
          )}
        </div>
        
        <div
          className={tamañoMovil && user ? "menu-movil" : "menu"}
          onClick={handleMenuClick}
        >
          <i className='iconoMenu'>
            <HiBars4 />
          </i>
          </div>
          
          {menuVisible && tamañoMovil? (
            <div
              className={
                tamañoMovil ? "navUsuario-movil" : "navUsuario"
              }
            >
              {user ? (
                <div className={tamañoMovil ? "div-movil" : "home"}>
                  <Link className="link" to="/home">
                    <i className="iconosNav">
                      <IoHome />
                    </i>
                    Home
                  </Link>
                </div>
              ) : (
                ""
              )}
              {user && user.role === "admin" ? (
                <div
                  className={
                    tamañoMovil ? "div-movil" : "admin-usuarios"
                  }
                >
                  <Link className="link" to="/admin-usuarios">
                    <i className="iconosNav">
                      <MdAdminPanelSettings />
                    </i>
                    Admin Usuarios
                  </Link>
                </div>
              ) : (
                ""
              )}
              {user ? (
                <div
                  className={tamañoMovil ? "div-movil" : "mi-perfil"}
                >
                  <Link className="link" to="/mi-perfil">
                    <i className="iconosNav">
                      <FaUserCog />
                    </i>
                    Perfil
                  </Link>
                </div>
              ) : (
                ""
              )}
              {user ? (
                <div
                  className={tamañoMovil ? "div-movil" : "logout"}
                  onClick={cerrarSesion}
                >
                  <Link className="link-logout">
                    <i className="iconosNav">
                      <RiLogoutCircleRLine />
                    </i>
                    Salir
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          ):""}

          {!menuVisible && !tamañoMovil?
            <div
              className={
                tamañoMovil ? "navUsuario-movil" : "navUsuario"
              }
            >
              {user ? (
                <div className={tamañoMovil ? "div-movil" : "home"}>
                  <Link className="link" to="/home">
                    <i className="iconosNav">
                      <IoHome />
                    </i>
                    Home
                  </Link>
                </div>
              ) : (
                ""
              )}
              {user && user.role === "admin" ? (
                <div
                  className={
                    tamañoMovil ? "div-movil" : "admin-usuarios"
                  }
                >
                  <Link className="link" to="/admin-usuarios">
                    <i className="iconosNav">
                      <MdAdminPanelSettings />
                    </i>
                    Admin Usuarios
                  </Link>
                </div>
              ) : (
                ""
              )}
              {user ? (
                <div
                  className={tamañoMovil ? "div-movil" : "mi-perfil"}
                >
                  <Link className="link" to="/mi-perfil">
                    <i className="iconosNav">
                      <FaUserCog />
                    </i>
                    Perfil
                  </Link>
                </div>
              ) : (
                ""
              )}
              {user ? (
                <div
                  className={tamañoMovil ? "div-movil" : "logout"}
                  onClick={cerrarSesion}
                >
                  <Link className="link-logout">
                    <i className="iconosNav">
                      <RiLogoutCircleRLine />
                    </i>
                    Salir
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>:""}

          
            
      </nav>
    </header>
  );
};


export default Header;
