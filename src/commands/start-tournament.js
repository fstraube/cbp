import answers from './../answers/index.js';
const { answerSuccess, embedAnswer } = answers;

export default {
	name: 'start-tournament',
	aliases: ['st', 'start', 'newTournament'],
	description: 'Start a new tournament',
	execute: async (message) => {
		await message.channel.send(answerSuccess('newTournament'));
		await message.channel.send(embedAnswer('newTournament'))
			.then(msg => {
				msg.delete({ timeout: 5000 }).then(async () => {
					await message.channel.send(embedAnswer('pickTeammate'));
					await message.channel.send(answerSuccess('pickTeammate'));
				});
			});
	},
};