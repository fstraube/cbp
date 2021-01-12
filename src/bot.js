'use strict';
import 'dotenv/config.js';
import Discord from 'discord.js';
import config from './config.js';
const { prefix } = config;
const client = new Discord.Client();
client.commands = new Discord.Collection();
import commands from './commands/index.js';
import { connectDb } from './models/index.js';
import models from './models/index.js';
const { Team } = models;

commands.map(command => {
	client.commands.set(command.name, command);
});

const eraseDatabaseOnSync = true;
connectDb().then(async () => {

	if (eraseDatabaseOnSync) {
		await Promise.all([
			Team.deleteMany({}),
		]);
	}

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
	const commandName = args
		.shift()
		.toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		command
			.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


client.login(process.env.DISCORDJS_BOT_TOKEN);