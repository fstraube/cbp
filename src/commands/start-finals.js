import models from './../models/index.js';
const { Match } = models;

import answers from './../answers/index.js';
const { answerError, answerSuccess } = answers;

export default {
	name: 'start-finals',
	aliases: ['f'],
	description: 'start semifinals and create channels',
	execute: async (message) => {

		const SF1 = await Match.findOne({ group: 'SF1' });
		const SF2 = await Match.findOne({ group: 'SF2' });
		const SF3 = await Match.findOne({ group: 'SF3' });
		const SF4 = await Match.findOne({ group: 'SF4' });


		await Match.create({
			group: 'Final',
			round: 5,
			homeTeam: SF1.winner,
			awayTeam: SF2.winner,
		});

		await Match.create({
			group: '3rd place',
			round: 5,
			homeTeam: SF1.loser,
			awayTeam: SF2.loser,
		});

		await Match.create({
			group: '5th place',
			round: 5,
			homeTeam: SF3.winner,
			awayTeam: SF4.winner,
		});

		await Match.create({
			group: '7th place',
			round: 5,
			homeTeam: SF3.loser,
			awayTeam: SF4.loser,
		});

		const matches = await Match.find({ round: 5 });

		if (!matches || matches.length === 0) {
			return message.reply(answerError('startRound'));
		}

		matches.forEach(async match => (
			await message.guild.channels.create(`${match.group}: ${match.homeTeam} vs. ${match.awayTeam}`, { type: 'voice', reason: 'Semifinals' }),
			await message.channel.send(answerSuccess('startFinals', { round: 5, match: match }))
		),
		);


	},
};