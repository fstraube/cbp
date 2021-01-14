import models from './../models/index.js';
const { Team, Round } = models;

import messages from './../messages/index.js';
const { returnMessage, returnEmbedMessage } = messages;

export default {
	name: 'result',
	description: 'Enter game result <cups><airballs><opponentAirballs>',
	usage: '<cups><airballs><opponentAirballs>',
	args: true,
	execute: async (message, args) => {

		// const user = message.author;

		const team = await Team.findOne({ id: /500727550948147211/i });
		const teamname = team.teamname;
		console.log(teamname);
		const channels = message.guild.channels.cache.map(channel => ({
			id: channel.id,
			name: channel.name,
		}));

		const matchChannel = channels.find(channel => channel.name.includes(teamname));

		const matchName = matchChannel.name.split(' ');
		const match = { home: matchName[0], away: matchName[2] };

		console.log(match);

		const cups = args[0];
		const abs = args[1];
		const oabs = args[2];

		const round = await Round.find().where({ matches: { $eq: { home: match.home, away: match.away } } });

		console.log(round);
	},
};