import React, { useState, useEffect } from 'react';
import './CiudadLanding.css';

const CiudadLanding = () =>{


    return (
			<>
				<section className="values__page">
					<h2 className="values__title-section">¿Por qué elegirnos?</h2>
					<div className="values__section">
						<div className="values__container">
							<h6 className="values__title">PLANES URBANOS</h6>
							<img className="values__icon" src={"https://i.postimg.cc/7ZnZggct/cityscape-white.png"} />
							<h6 className="values__content">Los mejores planes urbanos de cada ciudad.</h6>
						</div>
						<div className="values__container">
							<h6 className="values__title">PLANES RURALES</h6>
							<img className="values__icon" src={"https://i.postimg.cc/g0ck4xbz/landscape-white.png"} />
							<h6 className="values__content">Todo tipo de planes rurales para todos los niveles.</h6>
						</div>
						<div className="values__container">
							<h6 className="values__title">CERCA DE TI</h6>
							<img className="values__icon" src={"https://i.postimg.cc/26VjRg5g/radar-white.png"} />
							<h6 className="values__content">Nuestro buscador te mostrará los mejores planes cerca de ti.</h6>
						</div>
						<div className="values__container">
							<h6 className="values__title">RECORRIDOS</h6>
							<img className="values__icon" src={"https://i.postimg.cc/25HjtCC4/roadmap-white.png"} />
							<h6 className="values__content">Diferentes recorridos según el tipo de plan y el nivel escogido.</h6>
						</div>
					</div>
				</section>
				<section className="slogan">
					<h4 className="slogan__text">Nosotros ponemos los planes</h4>
					<img className="slogan__logo" src={"https://i.postimg.cc/66yPFFWZ/maravillas-espa-a-white.png"} />
					<h4 className="slogan__text">Tú pones las ganas</h4>
				</section>
				<section className="collage__page">
                    <span className='collage__background'></span>
                    <h2 className='collage__title'>Descubre nuestros más de 400 planes</h2>
					<div className="collage__section">
						<article className="collage__container collage__position-1">
                            <span className='collage__background-card'></span>
							<h3 className="collage__text">Catedrales</h3>
						</article>
						<article className="collage__container collage__position-2">
                            <span className='collage__background-card'></span>
							<h3 className="collage__text">Castillos</h3>
						</article>
						<article className="collage__container collage__position-3">
                            <span className='collage__background-card'></span>
							<h3 className="collage__text">Museos</h3>
						</article>
						<article className="collage__container collage__position-4">
                            <span className='collage__background-card'></span>
							<h3 className="collage__text">Naturaleza</h3>
						</article>
						<article className="collage__container collage__position-5">
                            <span className='collage__background-card'></span>
							<h3 className="collage__text">Pueblos</h3>
						</article>
						<article className="collage__container collage__position-6">
                            <span className='collage__background-card'></span>
							<h3 className="collage__text">Playas</h3>
						</article>
					</div>
				</section>
			</>
		);
};

export default CiudadLanding;