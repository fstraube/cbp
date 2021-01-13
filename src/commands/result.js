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
		// const team = await Team.findOne({ '$match': { id: message.author.id + 1 } });
		const match = await Round.find({ group: 'A' });
		// const cups = args[0];
		// const abs = args[1];
		// const oabs = args[2];
		console.log('team: ', match);
	},
};