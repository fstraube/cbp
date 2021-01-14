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
		const roundByGroup = await Round.find({ round: n });
		roundByGroup.forEach(group => (
			group.matches.forEach(async match => (
				await message.guild.channels.create(`${match.home} vs. ${match.away}`, { type: 'voice', reason: `Round ${n}` }),
				await message.channel.send(returnMessage('startRound', { round: n, match }))
			))
		));
	},
};