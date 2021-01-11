// import { team } from './../models/team';

export default {
	name: 'create-team',
	aliases: ['createTeam', 'createteam', 'create team', 'create_team'],
	description: 'Create your team with a <name> and select one <member> with a mention.',
	uusage: '<name> <member>',
	execute: (message, args) => {

		console.log('ARGS', args);

		// team.createTeam();


		return message
			.channel
			.send('CT');
	},
};