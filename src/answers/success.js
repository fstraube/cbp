const answer = (idf, payload) => {

	const adminMsg = 'Please contact <@!500727550948147211> or <@!690852668515549196>';

	switch (idf) {
		case 'createTournament':
			return `Tournament \`${payload.name}\` with \`${payload.teamsCount}\` teams in \`${payload.groupsCount}\` groups, was created successfully!`;
		case 'missingTeammember':
			return `your team \`${payload}\` needs a \`member\`. The proper usage would be: \`/create-team <teamname> <teammember> as @mention\``;
		case 'errorRoundRobin':
			return 'could not create round';
		case 'errorStartRound':
			return `could not start round ${payload}`;
		case 'groupsExist':
			return 'Groups `A` | `B` already exists!';
		case 'startRound':
			return `Created channel \`${payload.match.homeTeam} vs. ${payload.match.awayTeam}\`. Please join your channel!`;
		case 'errorResult':
			return 'that\'s not possible at the momnet.' + adminMsg;
		case 'win':
			return `\`Congratulations!\` Your team \`${payload.winner}\` won ` +
				`with \`${payload.cups}\` ${payload.cups === '1' ? 'cup' : 'cups'} ` +
				`and \`${payload.wabs}\` ${payload.wabs === '1' ? 'airball' : 'airballs'} vs. \`${payload.loser}\` ` +
				`with \`${payload.labs}\` ${payload.labs === '1' ? 'airball' : 'airballs'}!`;
		case 'deleteChannel':
			return `\`${payload.name}\` channel closed!`;
		case 'tables':
			return 'current table status';
		default:
			return `sorry something went wrong. ${adminMsg}`;
	}
};
export default answer;