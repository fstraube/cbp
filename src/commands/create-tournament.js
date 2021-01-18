import models from './../models/index.js';
const { Tournament, Team, Match } = models;

import answers from './../answers/index.js';
const { answerSuccess, answerError, embedAnswer } = answers;

import roundRobin from 'roundrobin';

export default {
	name: 'create-tournament',
	aliases: ['ct', 'createTournament', 'createtournament', 'newTournament', 'new-tournament'],
	description: 'Create a tournament team with a <name> and select one <member> with a mention.',
	usage: '<tornament_name> <teams_count> <groups_count>',
	args: true,
	execute: async (message, args) => {

		const tournamentName = args[0];
		const teamsCount = Number(args[1]);
		const groupsCount = Number(args[2]);

		if (args.length === 0 || isNaN(args[1]) || isNaN(args[2])) {
			return message.author.send('Please enter <tornament_name> <teams_count> <groups_count>');
		}

		const tournamentData = {
			name: tournamentName, teamsCount, groupsCount, finished: false,
		};

		try {
			const tournament = await Tournament.createTournament(tournamentData);
			await message.channel.send(answerSuccess('createTournament', tournament));

			for (let i = 0; i < teamsCount; i++) {
				let name = '';
				let id = null;
				const members = [];
				if (i === 0) {
					name = 'TeamAdmin';
					id = message.author.id + 500727550948147211;
					members.push(message.author);
					members.push('<@500727550948147211>');
				}
				else {
					const guildMembers = await message.guild.members.fetch();
					const memberUserObjects = [];
					guildMembers.map(member => memberUserObjects.push(member.user));

					const rndX = Math.floor(Math.random() * memberUserObjects.length);
					const rndY = Math.floor(Math.random() * memberUserObjects.length);

					name = `Team${i}`;
					id = memberUserObjects[rndX].id + (memberUserObjects[rndY].id);
					members.push(memberUserObjects[rndX]);
					members.push(memberUserObjects[rndY]);
				}
				const teamData = {
					id,
					name,
					members,
				};

				await Team.createTeam(teamData);
			}

			const teams = await Team.find({});

			const shuffleTeams = (array) => {
				return array.sort(() => Math.random() - 0.5);
			};

			const shuffeldTeams = shuffleTeams(teams);

			shuffeldTeams.map(async (team, index) => {

				if (index % 2 === 0) {
					await Team.updateTeam({ name: team.name }, { group: 'A' });
				}
				else {
					await Team.updateTeam({ name: team.name }, { group: 'B' });
				}
			});

			const groupA = await Team.find({ group: 'A' });
			const groupB = await Team.find({ group: 'B' });

			await message.channel.send(embedAnswer('createGroups', { group: 'A', teams: groupA }));
			await message.channel.send(embedAnswer('createGroups', { group: 'B', teams: groupB }));

			const teamsA = groupA.map(team => team.name);
			const teamsB = groupB.map(team => team.name);

			const roundsA = roundRobin(teamsA.length, teamsA);
			const roundsB = roundRobin(teamsA.length, teamsB);

			roundsA.forEach(round => round.forEach((match, index) => Match.create({
				group: 'A',
				round: index + 1,
				homeTeam: match[0],
				awayTeam: match[1],
			})));

			roundsB.forEach((round, index) => round.forEach((match) => Match.create({
				group: 'B',
				round: index + 1,
				homeTeam: match[0],
				awayTeam: match[1],
			})));

			await Match.create({
				group: 'SF',
				round: 1,
				homeTeam: 'A1',
				awayTeam: 'B2',
			});

			await Match.create({
				group: 'SF',
				round: 2,
				homeTeam: 'B1',
				awayTeam: 'A2',
			});

			await Match.create({
				group: 'SF',
				round: 3,
				homeTeam: 'A3',
				awayTeam: 'B4',
			});

			await Match.create({
				group: 'SF',
				round: 4,
				homeTeam: 'B3',
				awayTeam: 'A4',
			});

			await Match.create({
				group: 'F',
				round: 7,
				homeTeam: 'LSF3',
				awayTeam: 'LSF4',
			});

			await Match.create({
				group: 'F',
				round: 5,
				homeTeam: 'SSF3',
				awayTeam: 'SSF4',
			});

			await Match.create({
				group: 'F',
				round: 3,
				homeTeam: 'LSF1',
				awayTeam: 'LSF2',
			});

			await Match.create({
				group: 'F',
				round: 1,
				homeTeam: 'SSF1',
				awayTeam: 'SSF2',
			});

			await message.channel.send(embedAnswer('rounds', { group: 'A', rounds: roundsA }));
			await message.channel.send(embedAnswer('rounds', { group: 'B', rounds: roundsB }));

			const sfs = await Match.find({ group: 'SF' });
			const fs = await Match.find({ group: 'F' });

			await message.channel.send(embedAnswer('sfs', { group: 'sfs', rounds: sfs }));
			await message.channel.send(embedAnswer('fs', { group: 'fs', rounds: fs }));

		}
		catch (error) {
			console.error(error);
			return message.author.send(answerError('createTournament', error));
		}

	},
};