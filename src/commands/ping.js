export default {
	name: 'ping',
	description: 'Ping!!',
	execute: (message) => {
		return message
			.channel
			.send('```diff\n+green\n-red\n```');
	},
};
