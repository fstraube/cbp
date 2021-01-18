const answer = (idf, error) => {
	console.log(error);
	switch (idf) {
		case 'createTournament':
			if (error.message.includes('11000')) {
				return 'Tournament already exists!';
			}
			return `Could not create the tournament: ${error.message}`;
		default:
			return `Something went wrong: ${error.message}`;
	}
};
export default answer;