import models from './../models/index.js';
const { Team } = models;

import answers from './../answers/index.js';
const { answer, embedAnswer } = answers;

export default {
	name: 'list-teams',
	aliases: ['listteams', 'listTeams', 'teams'],
	description: 'show all registrated teams',
	execute: async (message) => {
		const teams = await Team.find({});
		message.channel.send(embedAnswer('listTeams', teams));
	},
};