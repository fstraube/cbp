import models from './../models/index.js';
const { Team } = models;

import messages from './../messages/index.js';
const { returnMessage, returnEmbedMessage } = messages;

export default {
	name: 'create-test-teams',
	description: 'Create test teams by <number>',
	usage: '<number> count of test teams',
	args: true,
	execute: (message, args) => {
		const count = args[0];

		for (let i = 0; i <= count; i++) {

			const teamname = `Team${i}`;


			const id = message.author.id + (message.author.id + i);
			const teammembers = [];
			teammembers.push(message.author);
			teammembers.push(message.author);
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
		}
	},
};