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

		const cups = Number(args[0]);
		const wabs = Number(args[1]);
		const labs = Number(args[2]);

		if (isNaN(cups) || isNaN(wabs) || isNaN(labs) || args.length !== 3) {
			return message.reply(returnMessage('wrongResult'));
		}

		const user = message.author;
		const id = new RegExp(user.id, 'i');
		const team = await Team.findOne({ id: id }).catch(err => console.error('Find team by id: ', err.message));
		const teamname = team.teamname;

		const channelList = message.guild.channels.cache.map(channel => ({
			id: channel.id,
			name: channel.name,
		})).catch(err => console.error('Get channels from server: ', err.message));

		const matchChannel = channelList.find(channel => channel.name.includes(teamname));

		if (!matchChannel) {
			return message.reply(returnMessage('resultExists'));
		}

		const matchName = matchChannel.name.split(' ');
		const match = { home: matchName[0], away: matchName[2] };

		const round = await Round.findOne({ matches: { $eq: { home: match.home, away: match.away } } })
			.catch(err => console.error('Find round by match: ', err.message));

		const newGame = {
			group: round.group,
			round: round.round,
			cups: args[0],
			winner: teamname,
			wabs: args[1],
			loser: (teamname === match.home) ? match.away : match.home,
			labs: args[2],
		};

		try {
			await Game.create(newGame),
				await Team.updateTeam(newGame.winner, {
					group: newGame.group,
					cups: newGame.cups,
					abs: newGame.wabs,
					wins: 1,
					defeats: 0,
				}),
				await Team.updateTeam(newGame.loser, {
					group: newGame.group,
					cups: -newGame.cups,
					abs: newGame.labs,
					wins: 0,
					defeats: 1,
				});
		}
		catch (err) {
			err => console.error('Save game an update teams: ', err.message);
		}

		try {
			await message.channel.send(returnMessage('win', newGame));
			await message.channel.send(returnEmbedMessage('win'))
				.then(msg => msg.delete({ timeout: 5000 }));
			await message.guild.channels.cache.get(matchChannel.id).delete();
			await message.channel.send(returnMessage('deleteChannel', matchChannel));
		}
		catch (error) {
			err => console.error('Sending result return messages: ', err.message);
		}
	},
};