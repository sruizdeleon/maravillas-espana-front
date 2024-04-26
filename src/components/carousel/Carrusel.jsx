import React, { useState, useEffect } from 'react';
import './Carrusel.css';

const Carrusel = () => {
    // Estado para controlar la imagen actual
    const [currentImage, setCurrentImage] = useState(0);
    const [currentTitle, setTitle] = useState(0);
    const [currentLocalizationText, setLocalizationText] = useState(0);

    // Arreglo de URLs de las imágenes
    const images = [
        'https://www.spain.info/.content/imagenes/cabeceras-grandes/naturaleza/castellfollit-de-la-roca-girona-s1419125804.jpg',
        'https://www.spain.info/.content/imagenes/cabeceras-grandes/cataluna/palafrugell-girona-s144973225.jpg',
        'https://www.spain.info/.content/imagenes/cabeceras-grandes/parques-nacionales/pn-aiguestortes-s1556525279.jpg'
    ];
    const titles = ['Castellfollit de la roca ','Palafrugell','Parque nacional de aiguestortes']

    const locations = ['Girona','Girona','Aiguestortes']

    // Función para cambiar a la imagen siguiente
/*     const nextImage = () => {
        setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
        setTitle((prevTitle) => (prevTitle - 1 + titles.length) % titles.length);
        setLocalizationText((prevLocation) => (prevLocation - 1 + locations.length) % locations.length);
    }; */

    // Función para cambiar a la imagen anterior
/*     const prevImage = () => {
        setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
    }; */
/*     const prevTitle = () => {
        setTitle((prevTitle) => (prevTitle - 1 + titles.length) % titles.length);
    }; */
/*     const prevLocation = () => {
        setLocalizationText((prevLocation) => (prevLocation - 1 + locations.length) % locations.length);
    }; */

    // Efecto para avanzar automáticamente las imágenes cada 5000ms
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
            setTitle((prevTitle) => (prevTitle - 1 + titles.length) % titles.length);
            setLocalizationText((prevLocation) => (prevLocation - 1 + locations.length) % locations.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className='total-carrusel'>
                <h4 className='title-carrusel'>{titles[currentTitle]}</h4>
                <div className="carrusel">
                    {/* <button className="prev-button" onClick={prevImage}>{'<'}</button> */}
                    <img className="img-carrusel" src={images[currentImage]} alt={`Imagen ${currentImage + 1}`} />
                    {/* <button className="next-button" onClick={nextImage}>{'>'}</button> */}
                    {/* <button className="localization">📍</button> */}
                    <p className='text-localization'>
                        {<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M34.3667 14.0833C32.6167 6.38332 25.9 2.91666 20 2.91666C20 2.91666 20 2.91666 19.9833 2.91666C14.1 2.91666 7.36667 6.36666 5.61667 14.0667C3.66667 22.6667 8.93334 29.95 13.7 34.5333C15.4667 36.2333 17.7333 37.0833 20 37.0833C22.2667 37.0833 24.5333 36.2333 26.2833 34.5333C31.05 29.95 36.3167 22.6833 34.3667 14.0833ZM20 22.4333C17.1 22.4333 14.75 20.0833 14.75 17.1833C14.75 14.2833 17.1 11.9333 20 11.9333C22.9 11.9333 25.25 14.2833 25.25 17.1833C25.25 20.0833 22.9 22.4333 20 22.4333Z" fill="white"/>
                        </svg>}
                        {locations[currentLocalizationText]}</p>
                </div>
            </div>
        </>
    );
};

export default Carrusel;
