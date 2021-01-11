export default {
	name: 'ping',
	description: 'Ping!!',
	execute: (message) => {
		return message
			.channel
			.send('Pong.');
	},
};
