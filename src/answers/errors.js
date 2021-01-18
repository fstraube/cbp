const answer = (idf, error) => {
	switch (idf) {
		case 'createTournament':
			if (error.message.includes('11000')) {
				return 'Tournament already exists!';
			}
			return `Could not create the tournament: ${error.message}`;
		case 'createTeam':
			return 'your team already exists.';
		case 'noTeams':
			return 'there are no teams yet!';
		case 'groupDraw':
			return 'something went wrong by drawing groups!';
		case 'roundRobin':
			return `could not create rounds ${error.message}`;
		default:
			return `Something went wrong: ${error.message}`;
	}
};
export default answer;