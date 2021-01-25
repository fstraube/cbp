import Discord from 'discord.js';
const client = new Discord.Client();
client.commands = new Discord.Collection();
import config from './../config.js';
const { prefix } = config;
import commands from './../commands/index.js';

commands.map(command => {
	client.commands.set(command.name, command);
});


const messageController = (message) => {

	if (message.content.startsWith('#')) {
		const args = message
			.content
			.slice(1)
			.split('');
		const command = client
			.commands
			.get('result');

		command.execute(message, args);
	}

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

	const command = client
		.commands
		.get(commandName) || client
			.commands
			.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) {
		return;
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message
			.channel
			.send(reply);
	}

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		return message.reply('there was an error trying to execute that command!');
	}
};

export default messageController;