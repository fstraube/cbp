const returnMessage = (idf, payload) => {

	const adminMsg = 'Please contact <@!500727550948147211> or <@!690852668515549196>';

	switch (idf) {
		case 'missingTeammember':
			return `your team \`${payload}\` needs a \`member\`. The proper usage would be: \`/create-team <teamname> <teammember> as @mention\``;
		case 'createdTeamError':
			return `your team \`${payload}\` already exists. ${adminMsg}`;
		case 'noTeams':
			return 'there are no teams yet!';
		case 'errorGroupDraw':
			return 'something went wrong by drawing groups!';
		case 'errorRoundRobin':
			return 'could not create round';
		case 'groupsExist':
			return 'Groups `A` | `B` already exists!';
		case 'startRound':
			return `Created channel \`${payload.match.home} vs. ${payload.match.away}\`. Please join your channel!`;
		case 'wrongResult':
			return 'as `#result` I only accept `3` numbers for `#<cups><airballs><opponentAirballs>`!';
		case 'win':
			return `\`Congratulations!\` Your team \`${payload.winner}\` won ` +
				`with \`${payload.cups}\` ${payload.cups === '1' ? 'cup' : 'cups'} ` +
				`and \`${payload.wabs}\` ${payload.wabs === '1' ? 'airball' : 'airballs'} vs. \`${payload.loser}\` ` +
				`with \`${payload.labs}\` ${payload.labs === '1' ? 'airball' : 'airballs'}!`;
		case 'deleteChannel':
			return `\`${payload.name}\` channel closed!`;
		case 'resultExists':
			return '`#result` exists. Is there a problem? ' + adminMsg;
		default:
			return `sorry something went wrong. ${adminMsg}`;
	}
};
export default returnMessage;