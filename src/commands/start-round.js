import models from './../models/index.js';
const { Team, Round } = models;

import messages from './../messages/index.js';
const { returnMessage, returnEmbedMessage } = messages;

export default {
	name: 'start-round',
	description: 'start a round by number and create channels',
	usage: '<number>',
	args: true,
	execute: async (message, args) => {

		const members = message.guild.members.cache;
		members.map(member =>
			message.channel.send(`<@!${member.user.id}>`),
		);

		const n = args[0];
		const roundByGroup = await Round.find({ round: n });
		roundByGroup.forEach(group => (
			group.matches.forEach(async match => (
				// await message.guild.channels.create(`${match.home} vs. ${match.away}`, { type: 'voice', reason: `Round ${n}` }),
				await message.channel.send(returnMessage('startRound', { round: n, match }))
			))
		));
	},
};