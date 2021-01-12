import { MessageEmbed } from 'discord.js';

const returnEmbedMessage = (idf, payload) => {

	const imgGroupA = 'https://docs.google.com/drawings/d/e/2PACX-1vSgl5WkSZmf9gRF78nehL8RqP7miAm8ggc6ODYvArXH5pavPpmo3DBgEleggE3TbDCmle6Q1levDnlG/pub?w=310&h=267';
	const imgGroupB = 'https://docs.google.com/drawings/d/e/2PACX-1vTHdY16E7672xWLJgTqyKW4KvOKLEa_k7bLQH8nFpm5rMJd1Z-vu6EwfcQ3EWes6svJ12_4KThMXZAQ/pub?w=310&h=267';

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
		case 'groupDraw':
			return new MessageEmbed().setImage('https://media.giphy.com/media/3o6MboNFtQ3bUIAgVi/giphy.gif');
		case 'createGroups':
			return new MessageEmbed().addFields(
				payload.teams.map(team => ({ name: team.teamname, value: `${team.teammembers[0]}, ${team.teammembers[1]}` })),
			).setThumbnail(payload.group === 'A' ? imgGroupA : imgGroupB);
		default:
			return 'Sorry I did\'nt get you. Try \'/help\' to see all my commands.';
	}
};
export default returnEmbedMessage;