import models from './../models/index.js';
const { Team, Match } = models;

import answers from './../answers/index.js';
const { answerError, answerSuccess } = answers;

export default {
	name: 'start-semifinals',
	aliases: ['sf'],
	description: 'start semifinals and create channels',
	execute: async (message) => {

		const tableGroupA = await Team.find({ group: 'A' });
		const tableGroupB = await Team.find({ group: 'B' });

		tableGroupA.sort((a, b) => {
			return b.wins - a.wins || b.cups - a.cups || a.airballs - b.airballs;
		});
		tableGroupB.sort((a, b) => {
			return b.wins - a.wins || b.cups - a.cups || a.airballs - b.airballs;
		});

		await Match.create({
			group: 'SF1',
			round: 4,
			homeTeam: tableGroupA[0].name,
			awayTeam: tableGroupB[1].name,
		});

		await Match.create({
			group: 'SF2',
			round: 4,
			homeTeam: tableGroupB[0].name,
			awayTeam: tableGroupA[1].name,
		});

		await Match.create({
			group: 'SF3',
			round: 4,
			homeTeam: tableGroupA[2].name,
			awayTeam: tableGroupB[3].name,
		});

		await Match.create({
			group: 'SF4',
			round: 4,
			homeTeam: tableGroupB[2].name,
			awayTeam: tableGroupA[3].name,
		});

		const matches = await Match.find({ round: 4 });

		if (!matches || matches.length === 0) {
			return message.reply(answerError('startRound'));
		}

		matches.forEach(async match => (
			await message.guild.channels.create(`${match.homeTeam} vs. ${match.awayTeam}`, { type: 'voice', reason: 'Semifinals' }),
			await message.channel.send(answerSuccess('startSemifinals', { round: 4, match: match }))
		),
		);

	},
};