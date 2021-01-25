'use strict';
import 'dotenv/config.js';
import Discord from 'discord.js';
const client = new Discord.Client();
import messageController from './controllers/message.js';

import { connectDb } from './models/index.js';
import models from './models/index.js';
const { Team, Group, Round } = models;

const eraseDatabaseOnSync = false;

connectDb().then(async () => {
	if (eraseDatabaseOnSync) {
		await Promise.all([Team.deleteMany({}), Group.deleteMany({}), Round.deleteMany({})]);
	}
	console.log('DB connected!');
});


client.once('ready', () => {
	if (client.user) {
		console.log(`${client.user.tag} logged in!`);
	}
});

client.on('message', messageController);

client.login(process.env.DISCORDJS_BOT_TOKEN);