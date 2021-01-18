import models from './../models/index.js';
const { Round } = models;

import answers from './../answers/index.js';
const { answer, embedAnswer } = answers;

export default {
	name: 'start-round',
	description: 'start a round by number and create channels',
	usage: '<number>',
	args: true,
	execute: async (message, args) => {

		const n = args[0];

		if (isNaN(n) || n.length !== 1) {
			return message.reply(answer('wrongStartRound'));
		}

		const allRoundsByGroup = await Round.find();

		allRoundsByGroup.forEach(group =>
			group.rounds[n - 1].forEach(async match => (
				await Promise.all([message.guild.channels.create(`${match[0]} vs. ${match[1]}`, { type: 'voice', reason: `Round ${n}` }),
				message.channel.send(answer('startRound', { round: n, match }))])
					.catch(err => {
						console.error(`Error starting round ${n}: `, err.message);
						return message.reply(answer('errorStartRound', n));
					},
					)
			)),
		);
	},
};