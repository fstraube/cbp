'use strict';
import 'dotenv/config.js';
import Discord from 'discord.js';
import config from './config.js';
const { prefix } = config;
const client = new Discord.Client();
client.commands = new Discord.Collection();

import { connectDb } from './models/index.js';
import commands from './commands/index.js';

commands.map(command => {
	client.commands.set(command.name, command);
});

connectDb().then(async () => {
	console.log('DB connected!');
	client.once('ready', () => {
		console.log('James: Ready!');
	});
});

client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}

	const args = message
		.content
		.slice(prefix.length)
		.trim()
		.split(/ +/);
	const command = args
		.shift()
		.toLowerCase();

	if (!client.commands.has(command)) {
		return;
	}

	try {
		client
			.commands
			.get(command)
			.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


client.login(process.env.DISCORDJS_BOT_TOKEN);