import React, { useState, useEffect } from 'react';
import './Carrusel.css';

const Carrusel = () => {
    // Estado para controlar la imagen actual
    const [currentImage, setCurrentImage] = useState(0);

    // Arreglo de URLs de las imágenes
    const images = [
        'https://www.spain.info/.content/imagenes/cabeceras-grandes/naturaleza/castellfollit-de-la-roca-girona-s1419125804.jpg',
        'https://www.spain.info/.content/imagenes/cabeceras-grandes/cataluna/palafrugell-girona-s144973225.jpg',
        'https://www.spain.info/.content/imagenes/cabeceras-grandes/parques-nacionales/pn-aiguestortes-s1556525279.jpg'
    ];

    // Función para cambiar a la imagen siguiente
    const nextImage = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    };

    // Función para cambiar a la imagen anterior
    const prevImage = () => {
        setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
    };

    // Efecto para avanzar automáticamente las imágenes cada 5000ms
    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className='total-carrusel'>
                <h4 className='title-carrusel'>Titulo Imagen Carrusel</h4>
                <div className="carrusel">
                    <button className="prev-button" onClick={prevImage}>{'<'}</button>
                    <img className="img-carrusel" src={images[currentImage]} alt={`Imagen ${currentImage + 1}`} />
                    <button className="next-button" onClick={nextImage}>{'>'}</button>
                    <button className="localization">📍</button>
                    <p className='text-localization'>Texto localización</p>
                </div>
            </div>
        </>
    );
};

export default Carrusel;
