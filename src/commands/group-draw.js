import models from './../models/index.js';
const { Team } = models;

import answers from './../answers/index.js';
const { answer, embedAnswer } = answers;

export default {
	name: 'group-draw',
	aliases: ['groupdraw', 'draw', 'lottery'],
	description: 'Create groups for tournament',
	execute: async (message) => {

		const teams = await Team.find({});

		if (!teams && teams.length === 0) {
			return message.reply(answer('noTeams'));
		}

		const shuffleTeams = (array) => {
			return array.sort(() => Math.random() - 0.5);
		};

		const shuffeldTeams = shuffleTeams(teams);

		shuffeldTeams.map(async (team, index) => {
			console.log(team);
			if (index % 2 === 0) {
				await Team.updateTeam({ teamname: team.teamname }, { group: 'A' })
					.catch(err => console.error('Team update group A: ', err.message));
			}
			else {
				await Team.updateTeam({ teamname: team.teamname }, { group: 'B' })
					.catch(err => console.error('Team update group B: ', err.message));
			}
		});

		const groupA = await Team.find({ group: 'A' });
		const groupB = await Team.find({ group: 'B' });

		try {
			await message.channel.send(embedAnswer('groupDraw'))
				.then(msg => msg.delete({ timeout: 5000 }));
			await message.channel.send(embedAnswer('createGroups', { group: 'A', teams: groupA }));
			await message.channel.send(embedAnswer('createGroups', { group: 'B', teams: groupB }));
		}
		catch (err) {
			console.error('Group draw error: ', err.message);
			message.reply(answer('errorGroupDraw'));
		}
	},
};