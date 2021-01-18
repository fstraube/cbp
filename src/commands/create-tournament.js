import models from './../models/index.js';
const { Tournament } = models;

import answers from './../answers/index.js';
const { answer, answerError, embedAnswer } = answers;

export default {
	name: 'create-tournament',
	aliases: ['ct', 'createTournament', 'createtournament', 'newTournament', 'new-tournament'],
	description: 'Create a tournament team with a <name> and select one <member> with a mention.',
	usage: '<tornament_name> <teams_count> <groups_count>',
	args: true,
	execute: async (message, args) => {

		const name = args[0];
		const teams_count = Number(args[1]);
		const groups_count = Number(args[2]);

		if (args.length === 0 || isNaN(args[1]) || isNaN(args[2])) {
			return message.author.send('Please enter <tornament_name> <teams_count> <groups_count>');
		}

		const data = {
			name, teams_count, groups_count, finished: false,
		};

		try {
			const tournament = await Tournament.createTournament(data);
		}
		catch (error) {
			return message.author.send(answerError('createTournament', error));
		}

	},
};