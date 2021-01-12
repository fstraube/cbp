import models from './../models/index.js';
const { Team, Group } = models;

import messages from './../messages/index.js';
const { returnEmbedMessage } = messages;

export default {
	name: 'group-draw',
	description: 'Create groups A | B for tournament',
	execute: async (message) => {

		const teams = await Team.find({});

		const shuffleTeams = (array) => {
			return array.sort(() => Math.random() - 0.5);
		};

		const shuffeldTeams = shuffleTeams(teams);

		const teamsGroupA = [];
		const teamsGroupB = [];

		shuffeldTeams.map((team, index) => {
			if (index % 2 === 0) {
				teamsGroupA.push(team);
			}
			else {
				teamsGroupB.push(team);
			}
		});

		const newGroupA = { group: 'A', teams: teamsGroupA };
		await Group.create(newGroupA).catch(err => console.error(err.message));
		const newGroupB = { group: 'B', teams: teamsGroupB };
		await Group.create(newGroupB).catch(err => console.error(err.message));

		return message.channel.send(returnEmbedMessage('groupDraw'))
			.then(msg => msg.delete({ timeout: 5000 }))
			.then(async () => {
				await message.channel.send(returnEmbedMessage('createGroups', { group: 'A', teams: teamsGroupA }));
				await message.channel.send(returnEmbedMessage('createGroups', { group: 'B', teams: teamsGroupB }));
			});
	},
};