import models from './../models/index.js';
const { Team, Match } = models;

import answers from './../answers/index.js';
const { answerError, answerSuccess, embedAnswer } = answers;

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
			return message.reply(answerError('resultEnter'));
		}

		const user = message.author;
		const id = new RegExp(user.id, 'i');
		const team = await Team.findOne({ id: id });
		const teamname = team.name;

		const serverChannels = await message.guild.channels.cache;
		const channelList = serverChannels.map(channel => ({
			id: channel.id,
			name: channel.name,
		}));

		const matchChannel = channelList.find(channel => channel.name.includes(teamname));

		if (!matchChannel) {
			return message.reply(answerError('resultExists'));
		}

		const matchName = matchChannel.name.split(' ');
		const homeTeam = matchName[0];
		const awayTeam = matchName[2];

		const updateStats = {
			cups: args[0],
			winner: teamname,
			wabs: args[1],
			loser: (teamname === homeTeam) ? awayTeam : homeTeam,
			labs: args[2],
		};

		try {
			await Match.updateMatch(homeTeam, awayTeam, updateStats);
			await Team.updateTeamStats({ name: updateStats.winner }, {
				cups: Number(updateStats.cups),
				abs: Number(updateStats.wabs),
				wins: 1,
				defeats: 0,
			});
			await Team.updateTeamStats({ name: updateStats.loser }, {
				cups: Number(-updateStats.cups),
				abs: Number(updateStats.labs),
				wins: 0,
				defeats: 1,
			});
		}
		catch (error) {
			console.log(error);
			return message.reply(answerError('resultExists'));
		}

		try {
			await message.channel.send(answerSuccess('win', updateStats));
			await message.channel.send(embedAnswer('win'))
				.then(msg => msg.delete({ timeout: 5000 }));
			await message.guild.channels.cache.get(matchChannel.id).delete();
			await message.channel.send(answerSuccess('deleteChannel', matchChannel));
		}
		catch (error) {
			return message.channel.send(answerError('result'), error);
		}
	},
};