import models from './../models/index.js';
const { Team } = models;

import answers from './../answers/index.js';
const { answer, embedAnswer } = answers;

export default {
	name: 'group-tables',
	aliases: ['grouptables', 'tables'],
	description: 'List groups A | B for tournament',
	execute: async (message) => {

		const tableGroupA = await Team.find({ group: 'A' });
		const tableGroupB = await Team.find({ group: 'B' });

		tableGroupA.sort((a, b) => {
			return b.wins - a.wins || b.cups - a.cups || a.airballs - b.airballs;
		});
		tableGroupB.sort((a, b) => {
			return b.wins - a.wins || b.cups - a.cups || a.airballs - b.airballs;
		});

		// const newGroupA = { group: 'A', teams: teamsGroupA };
		// await Group.create(newGroupA).catch(err => console.error(err.message));
		// const newGroupB = { group: 'B', teams: teamsGroupB };
		// await Group.create(newGroupB).catch(err => console.error(err.message));

		await message.channel.send(embedAnswer('tables', { group: 'A', table: tableGroupA }));
		await message.channel.send(embedAnswer('tables', { group: 'B', table: tableGroupB }));
	},
};