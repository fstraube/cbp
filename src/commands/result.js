import models from './../models/index.js';
const { Team, Match } = models;

import answers from './../answers/index.js';
const { answerError, embedAnswer } = answers;

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

		const updateMatch = {
			cups: args[0],
			winner: teamname,
			wabs: args[1],
			loser: (teamname === homeTeam) ? awayTeam : homeTeam,
			labs: args[2],
		};

		try {
			// await Match.updateMatch(homeTeam, awayTeam, updateMatch);
			await Team.updateTeam({ name: updateMatch.winner }, {
				cups: Number(updateMatch.cups),
				abs: Number(updateMatch.wabs),
				wins: 1,
				defeats: 0,
			});
			await Team.updateTeam({ name: updateMatch.loser }, {
				cups: Number(-updateMatch.cups),
				abs: Number(updateMatch.labs),
				wins: 0,
				defeats: 1,
			});
		}
		catch (error) {
			console.log(error);
			return message.reply(answerError('resultExists'));
		}

		// try {
		// 	await message.channel.send(answer('win', newGame));
		// 	await message.channel.send(returnEmbedMessage('win'))
		// 		.then(msg => msg.delete({ timeout: 5000 }));
		// 	await message.guild.channels.cache.get(matchChannel.id).delete();
		// 	await message.channel.send(answer('deleteChannel', matchChannel));
		// }
		// catch (error) {
		// 	err => console.error('Sending result return messages: ', err.message);
		// }
	},
};