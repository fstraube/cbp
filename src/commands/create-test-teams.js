import models from './../models/index.js';
const { Team } = models;
import answers from './../answers/index.js';
const { answerError, embedAnswer } = answers;

export default {
	name: 'create-test-teams',
	description: 'Create test teams by <number>',
	usage: '<number> count of test teams',
	args: true,
	execute: async (message, args) => {
		const count = args[0];

		for (let i = 0; i < count; i++) {
			let name = '';
			let id = null;
			const members = [];
			if (i === 0) {
				name = 'TeamAdmin';
				id = message.author.id + 500727550948147211;
				members.push(message.author);
				members.push('<@500727550948147211>');
			}
			else {
				const guildMembers = await message.guild.members.fetch()
					.catch(error => console.error(error));


				const memberUserObjects = [];
				guildMembers.map(member => memberUserObjects.push(member.user));

				const rndX = Math.floor(Math.random() * memberUserObjects.length);
				const rndY = Math.floor(Math.random() * memberUserObjects.length);

				name = `Team${i}`;
				id = memberUserObjects[rndX].id + (memberUserObjects[rndY].id);
				members.push(memberUserObjects[rndX]);
				members.push(memberUserObjects[rndY]);
			}
			const teamData = {
				id,
				name,
				members,
			};

			try {
				const team = await Team.create(teamData);
				message.channel.send(embedAnswer('createTeam', team));
			}
			catch (error) {
				return message.author.send(answerError('createTeam', name));
			}
		}
	},
};