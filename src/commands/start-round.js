import models from './../models/index.js';
const { Match } = models;

import answers from './../answers/index.js';
const { answerError, answerSuccess } = answers;

export default {
	name: 'start-round',
	description: 'start a round by number and create channels',
	usage: '<number>',
	args: true,
	execute: async (message, args) => {

		const n = args[0];

		if (isNaN(n) || n.length !== 1) {
			return message.reply(answerError('wrongStartRound'));
		}

		const matches = await Match.find({ round: n });


		// allRoundsByGroup.forEach(group =>
		// 	group.rounds[n - 1].forEach(async match => (
		// 		await Promise.all([message.guild.channels.create(`${match[0]} vs. ${match[1]}`, { type: 'voice', reason: `Round ${n}` }),
		// 		message.channel.send(answerSuccess('startRound', { round: n, match }))])
		// 			.catch(err => {
		// 				console.error(`Error starting round ${n}: `, err.message);
		// 				return message.reply(answerError('errorStartRound', n));
		// 			},
		// 			)
		// 	)),
		// );
	},
};