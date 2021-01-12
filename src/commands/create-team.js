import models from './../models/index.js';
const { Team } = models;

import messages from './../messages/index.js';
const { returnMessage, returnEmbedMessage } = messages;

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
			return message.channel.send(returnMessage('missingTeammember', teamname));
		}
		const id = message.author.id + teammember.id;
		const teammembers = [];
		teammembers.push(message.author);
		teammembers.push(teammember);
		const newTeam = {
			id,
			teamname,
			teammembers,
		};
		Team.create(newTeam).then(team => {
			return message.channel.send(returnEmbedMessage('createdTeamSuccess', team));
		}).catch(err => {
			console.error(err.message);
			return message.author.send(returnMessage('createdTeamError', teamname));
		});
	},
};