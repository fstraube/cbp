import { MessageEmbed } from 'discord.js';

const returnEmbedMessage = (idf, payload) => {

	const imgGroupA = 'https://docs.google.com/drawings/d/e/2PACX-1vSgl5WkSZmf9gRF78nehL8RqP7miAm8ggc6O' +
		'DYvArXH5pavPpmo3DBgEleggE3TbDCmle6Q1levDnlG/pub?w=310&h=267';
	const imgGroupB = 'https://docs.google.com/drawings/d/e/2PACX-1vTHdY16E7672xWLJgTqyKW4KvOKLEa_k7bLQ' +
		'H8nFpm5rMJd1Z-vu6EwfcQ3EWes6svJ12_4KThMXZAQ/pub?w=310&h=267';

	const winGifs = [
		'https://media.giphy.com/media/lMameLIF8voLu8HxWV/giphy.gif',
		'https://media.giphy.com/media/xT8qAY7e9If38xkrIY/giphy.gif',
		'https://media.giphy.com/media/s2qXK8wAvkHTO/giphy.gif',
		'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
		'https://media.giphy.com/media/LPBhHit55Xxx03lllW/giphy.gif',
		'https://media.giphy.com/media/m8crpzTJFRDPhqqhXJ/giphy.gif',
		'https://media.giphy.com/media/kQg7fQMvVD5Ha/giphy.gif',
	];

	const rndWinGif = Math.floor(Math.random() * winGifs.length);

	switch (idf) {
		case 'createdTeamSuccess':
			return new MessageEmbed()
				.setTitle(`Team: ${payload.name}`)
				.addFields({
					name: 'Member 1',
					value: payload.members[0],
					inline: true,
				}, {
					name: 'Member 2',
					value: payload.members[1],
					inline: true,
				});
		case 'listTeams':
			return new MessageEmbed()
				.setTitle('Teams:')
				.addFields(payload.map(team => (
					{
						name: `${team.name}`,
						value: `${team.members[0]} | ${team.members[1]}`,
					})),
				).setThumbnail('https://media.giphy.com/media/xT5LMGupUKCHb7DnFu/giphy.gif');
		case 'groupDraw':
			return new MessageEmbed().setImage('https://media.giphy.com/media/3o6MboNFtQ3bUIAgVi/giphy.gif');
		case 'createGroups':
			return new MessageEmbed().addFields(payload.teams.map(team => ({ name: team.name, value: `${team.members[0]}, ${team.members[1]}` })))
				.setThumbnail(payload.group === 'A'
					? imgGroupA
					: imgGroupB);
		case 'rounds':
			return new MessageEmbed()
				.setTitle('Group')
				.addFields(
					payload.rounds.map((round, index) => ({
						name: `Round ${index + 1}`,
						value: round.map(match => `\`${match[0]}\` : \`${match[1]}\``),
					})))
				.setThumbnail(payload.group === 'A'
					? imgGroupA
					: imgGroupB);
		case 'sfs':
			return new MessageEmbed()
				.setTitle('Semifinals:')
				.addFields(
					payload.rounds.map((round, index) => ({
						name: `Semifinal ${index + 1}`,
						value: `\`${round.homeTeam}\` : \`${round.awayTeam}\``,
					})));
		case 'fs':
			return new MessageEmbed()
				.setTitle('Finals:')
				.addFields(
					payload.rounds.map((round, index) => ({
						name: `Final ${index + 1}`,
						value: `\`${round.homeTeam}\` : \`${round.awayTeam}\``,
					})));
		case 'win':
			return new MessageEmbed().setImage(winGifs[rndWinGif]);
		case 'tables':
			return new MessageEmbed()
				.setTitle('Group')
				.setDescription('| Wins | Losses | Cups | Airballs |')
				.addFields(payload.table.map((team, index) => ({ name: `${index + 1}. ${team.name}`, value: `| ${team.stats.wins} |  ${team.stats.defeats} | ${team.stats.cups} | ${team.stats.abs} |` })))
				.setThumbnail(payload.group === 'A'
					? imgGroupA
					: imgGroupB);
		default:
			return 'Sorry I didn\'t get you. Try \'/help\' to see all my commands.';
	}
};
export default returnEmbedMessage;