import React, { useState } from 'react';
import './Carrusel.css';

const Carrusel = () => {
    // Estado para controlar la imagen actual
    const [currentImage, setCurrentImage] = useState(0);

    // Arreglo de URLs de las imágenes
    const images = [
        'https://picsum.photos/id/15/800/600',
        'https://picsum.photos/id/57/800/600',
        'https://picsum.photos/id/76/800/600'
    ];

    // Función para cambiar a la imagen siguiente
    const nextImage = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    };

    // Función para cambiar a la imagen anterior
    const prevImage = () => {
        setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
    };

    return (
        <>
            <h4 className='title-carrusel'>Titulo Imagen Carrusel</h4>
            <div className="carrusel">
                <button className="prev-button" onClick={prevImage}>{'<'}</button>
                <img src={images[currentImage]} alt={`Imagen ${currentImage + 1}`} />
                <button className="next-button" onClick={nextImage}>{'>'}</button>
                <button className="localization">📍</button>
            </div>
        </>
    );
};

export default Carrusel;
