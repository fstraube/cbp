import models from './../models/index.js';
const { Team, Round, Game } = models;

import messages from './../messages/index.js';
const { returnMessage, returnEmbedMessage } = messages;

export default {
	name: 'result',
	description: 'Enter game result <cups><airballs><opponentAirballs>',
	usage: '<cups><airballs><opponentAirballs>',
	args: true,
	execute: async (message, args) => {

		const user = message.author;
		const id = new RegExp(user.id, 'i');
		const team = await Team.findOne({ id: id });
		const teamname = team.teamname;

		const channelList = message.guild.channels.cache.map(channel => ({
			id: channel.id,
			name: channel.name,
		}));

		const matchChannel = channelList.find(channel => channel.name.includes(teamname));

		if (!matchChannel) {
			return message.reply(returnMessage('resultExists'));
		}

		const matchName = matchChannel.name.split(' ');
		const match = { home: matchName[0], away: matchName[2] };

		const round = await Round.findOne({ matches: { $eq: { home: match.home, away: match.away } } });
		console.log(round);
		const newGame = {
			group: round.group,
			round: round.round,
			cups: args[0],
			winner: teamname,
			wabs: args[1],
			loser: (teamname === match.home) ? match.away : match.home,
			labs: args[2],
		};

		await Promise.all([Game.create(newGame),
		Team.updateTeam(newGame.winner, {
			group: newGame.group,
			cups: Number(newGame.cups),
			abs: Number(newGame.wabs),
			wins: 1,
			defeats: 0,
		}),
		Team.updateTeam(newGame.loser, {
			group: newGame.group,
			cups: Number(-newGame.cups),
			abs: Number(newGame.labs),
			wins: 0,
			defeats: 1,
		})]).catch(err => console.error(err.message));

		await Promise.all([
			message.channel.send(returnMessage('win', newGame)),
			message.channel.send(returnEmbedMessage('win'))
				.then(msg => msg.delete({ timeout: 5000 })),
			message.channel.send(returnMessage('deleteChannel', matchChannel)),
			message.guild.channels.cache.get(matchChannel.id).delete(),
		]).catch(err => console.error(err.message));
	},
};