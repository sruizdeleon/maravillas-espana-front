const Home = () => {

	return (
		<>
			<section>
				<form>
					<div>
						<label htmlFor="comunidad">Comunidad</label>
						<input id="comunidad" name="comunidad" multiple list="lista-comunidades" placeholder="Comunidad"></input>
						<datalist id="lista-comunidades">
							<option>Andalucía</option>
							<option>Aragón</option>
							<option>Asturias</option>
							<option>Cantabria</option>
							<option>Castilla la Mancha</option>
							<option>Castilla y León</option>
							<option>Cataluña</option>
							<option>Comunidad de Madrid</option>
							<option>Comunidad Valenciana</option>
							<option>Extremadura</option>
							<option>Galicia</option>
							<option>La Rioja</option>
							<option>Murcia</option>
							<option>Navarra</option>
							<option>País Vasco</option>
						</datalist>
					</div>
					<div>
						<label htmlFor="provincia">Provincia</label>
						<input id="provincia" name="provincia" multiple list="lista-provincias" placeholder="Provincias"></input>
						<datalist id="lista-provincias">
							<option>Madrid</option>
						</datalist>
					</div>
					<div>
						<label htmlFor="plan">Tipo de plan</label>
						<input id="plan" name="plan" multiple list="lista-planes" placeholder="Tipo de plan"></input>
						<datalist id="lista-planes">
							<option>Plan de campo</option>
							<option>Plan de ciudad</option>
						</datalist>
					</div>
					<button>Buscar</button>
				</form>
			</section>
			<section>
				<div>
					<h2>Aquí están los mejores planes</h2>
					<div>
						<h5>Filtros</h5>
						<form>
							<fieldset>
								<legend>Orden</legend>
								<button type="button">Acendente</button>
								<button type="button">Descendente</button>
							</fieldset>
							<fieldset>
								<legend>Plan</legend>
								<button type="button">Plan de ciudad</button>
								<button type="button">Plan de campo</button>
							</fieldset>
							{/* Sólo si la comunidad tiene más de una provincia.
							Bucle con las provincias de esa comunidad,
							si sólo selecciona una, el resto seleccionada,
							si no selecciona ninguna todas seleccionadas
							para que las persona pueda añadir o quitar de la comunidad */}
						</form>
					</div>
				</div>
				<div>
				{/* Bucle con Componente tarjeta actividad */}
					{/* <article>
						<p>Imagen</p>
						<h3>Nombre actividad</h3>
						<p>Tipo de plan</p>
						<p>Comunidad</p>
						<p>Provincia</p>
						<p>Bandera provincia</p>
					</article> */}
				</div>
			</section>
		</>
	);
};

export default Home;
