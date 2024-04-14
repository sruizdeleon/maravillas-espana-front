const Home = () => {

	return (
		<>
			<section>
				<form>
					<div>
						<label htmlFor="comunidad">Comunidad</label>
						<input id="comunidad" name="comunidad" multiple list="lista-comunidades" placeholder="Comunidad"></input>
						<datalist id="lista-comunidades">
							<option>Madrid</option>
							<option>Barcelona</option>
						</datalist>
					</div>
					<input placeholder="Provincias"></input>
					<input placeholder="Tipo de plan"></input>
					<button>Buscar</button>
				</form>
			</section>
		</>
	);
};

export default Home;
