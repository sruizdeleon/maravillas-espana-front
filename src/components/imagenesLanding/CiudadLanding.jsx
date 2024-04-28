import React, { useState, useEffect } from 'react';
import './CiudadLanding.css';

const CiudadLanding = () =>{


    return (
        <>
            <div className='imagenes-landing'>
                <div className="background-black-01">
                        <img className="img-black-01" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/2048px-Solid_black.svg.png"}/>
                </div>
                <div className="imagen-ciudad">
                    <h4 className='titulo-ciudad'>LOS MEJORES PLANES URBANOS Y RURALES</h4>
                    <h6 className='parrafo-ciudad'>Con más de 600 actividades donde escoger</h6>
                    <img className="img-ciudad" src={"https://i.postimg.cc/QNH0BmPm/01-vista-aerea-valencia-oscuro.jpg"}/>
                </div>
                <div className="background-black-02">
                    <div className='icons'>
                        <div className="icon-01">
                            <h6 className='titulo-black-01'>PLANES URBANOS</h6>
                            <img className="img-01" src={"https://i.postimg.cc/7ZnZggct/cityscape-white.png"}/>
                            <h6 className="text-01">Los mejores planes urbanos de cada ciudad.</h6>
                        </div>
                        <div className="icon-02">
                            <h6 className='titulo-black-02'>PLANES RURALES</h6>
                            <img className="img-02" src={"https://i.postimg.cc/g0ck4xbz/landscape-white.png"}/>
                            <h6 className="text-02">Todo tipo de planes rurales para todos los niveles.</h6>
                        </div>
                        <div className="icon-03">
                            <h6 className='titulo-black-03'>CERCA DE TI</h6>
                            <img className="img-03" src={"https://i.postimg.cc/26VjRg5g/radar-white.png"}/>
                            <h6 className="text-03">Nuestro buscador te mostrará los mejores planes cerca de ti.</h6>
                        </div>
                        <div className="icon-04">
                            <h6 className='titulo-black-04'>RECORRIDOS</h6>
                            <img className="img-04" src={"https://i.postimg.cc/25HjtCC4/roadmap-white.png"}/>
                            <h6 className="text-04">Diferentes recorridos según el tipo de plan y el nivel escogido.</h6>
                        </div>
                    </div>
                    <img className="img-black-02" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/2048px-Solid_black.svg.png"}/>
                </div>
                <div className="imagen-rural">
                <img className='img-maravillas'src={"https://i.postimg.cc/66yPFFWZ/maravillas-espa-a-white.png"}/>
                    <h4 className='titulo-rural-01'>Nosotros ponemos los planes</h4>
                    <h4 className='titulo-rural-02'>Tú pones las ganas</h4>
                    <img className="img-rural" src={"https://i.postimg.cc/t7G4z7D5/03-playa-as-catedrais-galicia-oscuro.jpg"}/>
                </div>
            </div>
        </>
    );
};

export default CiudadLanding;