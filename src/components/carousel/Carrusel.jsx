import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Carrusel.css';

const Carrusel = () => {
    // Estado para controlar la imagen actual
    const navigate = useNavigate()
    const [currentImage, setCurrentImage] = useState(0);
    const [currentTitle, setTitle] = useState(0);
    const [currentLocalizationText, setLocalizationText] = useState(0);

    // Arreglo de URLs de las imágenes
    const images = [
			"https://www.spain.info/.content/imagenes/cabeceras-grandes/naturaleza/castellfollit-de-la-roca-girona-s1419125804.jpg",
			"https://www.spain.info/.content/imagenes/cabeceras-grandes/cataluna/palafrugell-girona-s144973225.jpg",
			"https://www.spain.info/.content/imagenes/cabeceras-grandes/parques-nacionales/pn-aiguestortes-s1556525279.jpg"
		];
    const titles = ['Castellfollit de la roca','Palafrugell','Parque Nacional de Aiguestortes']

    const locations = ['Girona','Girona','Lérida']

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
				<section className="carrusel__page" style={{ backgroundImage: `url(${images[currentImage]})` }}>
					<span className="carrusel__background"></span>
					<div className="carrusel__section">
						<div className="carrusel__location-container">
							<svg
								className="carrusel__location-icon"
								viewBox="0 0 40 40"
								fill="white"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M34.3667 14.0833C32.6167 6.38332 25.9 2.91666 20 2.91666C20 2.91666 20 2.91666 19.9833 2.91666C14.1 2.91666 7.36667 6.36666 5.61667 14.0667C3.66667 22.6667 8.93334 29.95 13.7 34.5333C15.4667 36.2333 17.7333 37.0833 20 37.0833C22.2667 37.0833 24.5333 36.2333 26.2833 34.5333C31.05 29.95 36.3167 22.6833 34.3667 14.0833ZM20 22.4333C17.1 22.4333 14.75 20.0833 14.75 17.1833C14.75 14.2833 17.1 11.9333 20 11.9333C22.9 11.9333 25.25 14.2833 25.25 17.1833C25.25 20.0833 22.9 22.4333 20 22.4333Z" />
							</svg>
							<h4 className="carrusel__location">
								{titles[currentTitle]}
								<br />({locations[currentLocalizationText]})
							</h4>
						</div>
						<div className="carrusel__main-container">
							<h1 className="carrusel__title">Los mejores planes urbanos y rurales</h1>
							<p className="carrusel__content">Disfruta de más de 400 planes por toda España a tan solo un clic.</p>
							<div className="carrusel__button-container">
								<button type="button" onClick={() => navigate("/signup")} className="carrusel__button">
									Registro
								</button>
								<button type="button" onClick={() => navigate("/login")} className="carrusel__button-trans">
									Iniciar sesión
								</button>
							</div>
						</div>
					</div>
				</section>
			</>
		);
};

export default Carrusel;
