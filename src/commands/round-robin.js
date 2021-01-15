import models from './../models/index.js';
const { Team, Round } = models;

import messages from './../messages/index.js';
const { returnMessage, returnEmbedMessage } = messages;

import roundRobin from 'roundrobin';

export default {
	name: 'round-robin',
	description: 'Create rounds for every group A | B',
	execute: async (message) => {

		const groupA = await Team.find({ group: 'A' });
		const groupB = await Team.find({ group: 'B' });

		const teamsA = groupA.map(team => team.teamname);
		const teamsB = groupB.map(team => team.teamname);

		const roundsA = roundRobin(teamsA.length, teamsA);
		const roundsB = roundRobin(teamsA.length, teamsB);

		try {
			await Round.create({ group: 'A', rounds: roundsA });
			await Round.create({ group: 'A', rounds: roundsA });
		}
		catch (err) {
			console.error('Error saving rounds: ', err.message);
		}

		try {
			await message.channel.send(returnEmbedMessage('rounds', { group: 'A', rounds: roundsA }));
			await message.channel.send(returnEmbedMessage('rounds', { group: 'B', rounds: roundsB }));
		}
		catch (err) {
			console.error('Error round-robin: ', err.message);
			return message.reply(returnMessage('errorRoundRobin'));
		}
	},
};