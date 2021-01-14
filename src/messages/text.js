const returnMessage = (idf, payload) => {

	const adminMsg = 'Please contact <@!500727550948147211> or <@!690852668515549196>';

	switch (idf) {
		case 'missingTeammember':
			return `your team \`${payload}\` needs a \`member\`. The proper usage would be: \`/create-team <teamname> <teammember> as @mention\``;
		case 'createdTeamError':
			return `your team \`${payload}\` already exists. ${adminMsg}`;
		case 'createGroups':
			return 'Groups';
		case 'groupsExist':
			return 'Groups A | B already exists!';
		case 'startRound':
			return `Created channel \`${payload.match.home} vs. ${payload.match.away}\`. Please join your channel!`;
		case 'win':
			return `**Congratulations!** Your team \`${payload.winner}\` won ` +
				`with \`${payload.cups}\` ${payload.cups === '1' ? 'cup' : 'cups'} ` +
				`and \`${payload.wabs}\` ${payload.wabs === '1' ? 'airball' : 'airballs'} vs. \`${payload.loser}\` ` +
				`with \`${payload.labs}\` ${payload.labs === '1' ? 'airball' : 'airballs'}!`;
		default:
			return `Sorry something went wrong. ${adminMsg}`;
	}
};
export default returnMessage;