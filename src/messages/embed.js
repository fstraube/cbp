import { MessageEmbed } from 'discord.js';

const returnEmbedMessage = (idf, payload) => {
	switch (idf) {
		case 'createdTeamSuccess':
			return new MessageEmbed().setTitle(`Team: ${payload.teamname}`).addFields({
				name: 'Member 1:',
				value: payload.teammembers[0],
				inline: true,
			}, {
				name: 'Member 2:',
				value: payload.teammembers[1],
				inline: true,
			});
		default:
			return 'Sorry I did\'nt get you. Try \'/help\' to see all my commands.';
	}
};
export default returnEmbedMessage;