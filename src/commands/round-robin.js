import models from './../models/index.js';
const { Team, Match } = models;

import answers from './../answers/index.js';
const { answer, embedAnswer } = answers;

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


		roundsA.forEach(round => round.forEach((match, index) => Match.create({
			group: 'A',
			round: index + 1,
			home: match[0],
			away: match[1],
			cups: 0,
			winner: null,
			wab: 0,
			loser: null,
			lab: 0,
		})));

		roundsB.forEach((round, index) => round.forEach((match) => Match.create({
			group: 'B',
			round: index + 1,
			home: match[0],
			away: match[1],
			cups: 0,
			winner: null,
			wab: 0,
			loser: null,
			lab: 0,
		})));


		// try {
		// 	await Round.create({ group: 'A', rounds: roundsA });
		// 	await Round.create({ group: 'B', rounds: roundsB });
		// }
		// catch (err) {
		// 	console.error('Error saving rounds: ', err.message);
		// }

		try {
			await message.channel.send(embedAnswer('rounds', { group: 'A', rounds: roundsA }));
			await message.channel.send(embedAnswer('rounds', { group: 'B', rounds: roundsB }));
		}
		catch (err) {
			console.error('Error round-robin: ', err.message);
			return message.reply(answer('errorRoundRobin'));
		}
	},
};