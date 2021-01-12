const returnMessage = (idf, payload) => {

	const adminMsg = 'Please contact <@!500727550948147211> or <@!690852668515549196>';

	switch (idf) {
		case 'missingTeammember':
			return `your team \`${payload}\` needs a \`member\`. The proper usage would be: \`/create-team <teamname> <teammember> as @mention\``;
		case 'createdTeamError':
			return `your team \`${payload}\` already exists. ${adminMsg}`;
		case 'createGroups':
			return 'Groups';
		default:
			return 'Sorry I did\'nt get you. Try \'/help\' to see all my commands.';
	}
};
export default returnMessage;