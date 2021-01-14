import models from './../models/index.js';
const { Team } = models;

import messages from './../messages/index.js';
const { returnEmbedMessage } = messages;

export default {
	name: 'list-teams',
	aliases: ['listteams', 'listTeams', 'teams'],
	description: 'show all registrated teams',
	execute: async (message) => {
		const teams = await Team.find({});
		message.channel.send(returnEmbedMessage('listTeams', teams));
	},
};