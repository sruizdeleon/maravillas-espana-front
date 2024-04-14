const Home = () => {

	const comunidades = [
		"Madrid",
	]


	return (
		<>
			<section>
				<form>
					<input placeholder="Comunidad"></input>
					<input placeholder="Provincias"></input>
					<input placeholder="Tipo de plan"></input>
					<button>Buscar</button>
				</form>
			</section>
		</>
	);
};

export default Home;
