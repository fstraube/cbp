import models from './../models/index.js';
const { Team } = models;
import messages from './../messages/index.js';
const { returnMessage, returnEmbedMessage } = messages;

export default {
	name: 'create-test-teams',
	description: 'Create test teams by <number>',
	usage: '<number> count of test teams',
	args: true,
	execute: async (message, args) => {
		const count = args[0];

		for (let i = 0; i < count; i++) {
			let teamname = '';
			let id = null;
			const teammembers = [];
			if (i === 0) {
				teamname = 'TeamAdmin';
				id = message.author.id + (message.author.id + i);
				teammembers.push(message.author);
				teammembers.push('<@500727550948147211>');
			}
			else {
				const members = await message.guild.members.fetch()
					.catch(console.error);

				const memberUserObjects = [];
				members.map(member => memberUserObjects.push(member.user));

				const rndX = Math.floor(Math.random() * memberUserObjects.length);
				const rndY = Math.floor(Math.random() * memberUserObjects.length);

				teamname = `Team${i}`;
				id = memberUserObjects[rndX].id + (memberUserObjects[rndY].id);
				teammembers.push(memberUserObjects[rndX]);
				teammembers.push(memberUserObjects[rndY]);
			}
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