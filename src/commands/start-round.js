import models from './../models/index.js';
const { Round } = models;

import messages from './../messages/index.js';
const { returnMessage } = messages;

export default {
	name: 'start-round',
	description: 'start a round by number and create channels',
	usage: '<number>',
	args: true,
	execute: async (message, args) => {

		const n = args[0];

		if (isNaN(n) || n.length !== 1) {
			return message.reply(returnMessage('wrongStartRound'));
		}

		const allRoundsByGroup = await Round.find();

		allRoundsByGroup.forEach(group =>
			group.rounds[n - 1].forEach(async match => (
				await Promise.all([message.guild.channels.create(`${match[0]} vs. ${match[1]}`, { type: 'voice', reason: `Round ${n}` }),
				message.channel.send(returnMessage('startRound', { round: n, match }))])
					.catch(err => {
						console.error(`Error starting round ${n}: `, err.message);
						return message.reply(returnMessage('errorStartRound', n));
					},
					)
			)),
		);
	},
};