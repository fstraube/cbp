import models from './../models/index.js';
const { Team } = models;
import answers from './../answers/index.js';
const { answerError, embedAnswer } = answers;

export default {
	name: 'create-test-teams',
	aliases: ['ctt'],
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

				const memberUserObjects = guildMembers.map(member =>
					member.user);

				const title = ['König', 'Prinz', 'Graf', 'Lord', 'Herzog', 'Freiherr', 'Baron', 'Ritter', 'Junker'];
				const of = ['Pimmel', 'Sack', 'Arsch', 'Hoden', 'Stolch', 'Lörres', 'Penis', 'Kimme', 'Smegma'];
				const body = ['Kopf', 'Haar', 'Gesicht', 'Nase', 'Mund', 'Ohr', 'Auge', 'Lippe', 'Stirn'];

				const rndTitle = Math.floor(Math.random() * title.length);
				const rndOf = Math.floor(Math.random() * title.length);
				const rndBody = Math.floor(Math.random() * title.length);

				const rndX = Math.floor(Math.random() * memberUserObjects.length);
				const rndY = Math.floor(Math.random() * memberUserObjects.length);

				name = `${title[rndTitle]}_${of[rndOf]}_${body[rndBody]}`;
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