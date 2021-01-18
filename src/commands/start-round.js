import models from './../models/index.js';
const { Match } = models;

import answers from './../answers/index.js';
const { answerError, answerSuccess } = answers;

export default {
	name: 'start-round',
	aliases: ['sr'],
	description: 'start a round by number and create channels',
	usage: '<number>',
	args: true,
	execute: async (message, args) => {

		const n = args[0];
		const matches = await Match.find({ round: n });

		if (!matches || matches.length === 0) {
			return message.reply(answerError('startRound'));
		}

		matches.forEach(async match => (
			await message.guild.channels.create(`${match.homeTeam} vs. ${match.awayTeam}`, { type: 'voice', reason: `Round ${n}` }),
			await message.channel.send(answerSuccess('startRound', { round: n, match: match }))
		),
		);
	},
};