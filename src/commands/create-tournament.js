export default {
	name: 'create-tournament',
	aliases: ['createTournament', 'createtournament', 'newTournament', 'new-tournament'],
	description: 'Create a tournament team with a <name> and select one <member> with a mention.',
	usage: '<tornament_name> <teams_count> <groups_count>',
	args: true,
	execute: (message, args) => {

		const name = args[0];
		const teams_count = args[1];
		const groups_count = args[2];

		const tournament_config = {
			name, teams_count, groups_count, finished: false,
		}

	},
};