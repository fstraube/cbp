import models from './../models/index.js';
const { Team } = models;

export default {
	name: 'create-team',
	aliases: ['createTeam', 'createteam', 'create_team'],
	description: 'Create your team with a <name> and select one <member> with a mention.',
	usage: '<teamname> <teammember> as @mention',
	args: true,
	execute: (message, args) => {

		const teamname = args[0];

		const teammember = message
			.mentions
			.users
			.first();

		if (!teammember) {
			return message.author.send(`your team \`${teamname}\` needs a \`member\`. The proper usage would be: \`/create-team <teamname> <teammember> as @mention\``);
		}

		const id = message.author.id + teammember.id;
		console.log(id);

		const teammembers = [];
		teammembers.push(message.author);
		teammembers.push(teammember);

		const newTeam = {
			id,
			teamname,
			teammembers,
		};

		Team.create(newTeam).then(teamSuccess => {

			console.log(teamSuccess);

			return message
				.channel
				.send('CT');
		}).catch(err => console.log(err.message));

	},
};