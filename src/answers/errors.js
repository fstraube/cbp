const answer = (idf, error) => {

	const adminMsg = 'Please contact <@!500727550948147211> or <@!690852668515549196>';

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
		case 'startRound':
			return 'this is not possible at the moment. No matches exists!';
		case 'resultEnter':
			return 'as `#result` I only accept `3` numbers for `#<cups><airballs><opponentAirballs>`!';
		case 'resultExists':
			return '`#result` exists. Is there a problem? ' + adminMsg;
		case 'result':
			return `result error: ${error.message}`;

		default:
			return `something went wrong: ${error.message}`;
	}
};
export default answer;