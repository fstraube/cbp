import models from './../models/index.js';
const { Group, Round } = models;

import messages from './../messages/index.js';
const { returnEmbedMessage } = messages;


export default {
	name: 'round-robin',
	description: 'Create rounds for every group A | B',
	execute: async (message) => {

		const groupA = await Group.findOne({ group: 'A' });
		const groupB = await Group.findOne({ group: 'B' });
		const groups = [groupA, groupB];

		const roundsByGroup = groups.map(group => (
			{
				round1:
					[
						{ home: group.teams[0].teamname, away: group.teams[1].teamname },
						{ home: group.teams[2].teamname, away: group.teams[3].teamname },
					],
				round2:
					[
						{ home: group.teams[2].teamname, away: group.teams[0].teamname },
						{ home: group.teams[3].teamname, away: group.teams[1].teamname },
					],
				round3:
					[
						{ home: group.teams[3].teamname, away: group.teams[0].teamname },
						{ home: group.teams[2].teamname, away: group.teams[1].teamname },
					],
			}
		));

		groups.forEach(async (group) =>
			await Promise.all([Round.create({
				group: group.group,
				round: '1',
				matches: [
					{ home: group.teams[0].teamname, away: group.teams[1].teamname },
					{ home: group.teams[2].teamname, away: group.teams[3].teamname },
				],
			}),
			Round.create({
				group: group.group,
				round: '2',
				matches: [
					{ home: group.teams[2].teamname, away: group.teams[0].teamname },
					{ home: group.teams[3].teamname, away: group.teams[1].teamname },
				],
			}),
			Round.create({
				group: group.group,
				round: '3',
				matches: [
					{ home: group.teams[3].teamname, away: group.teams[0].teamname },
					{ home: group.teams[2].teamname, away: group.teams[1].teamname },
				],
			}),
			],
			),
		);

		const newRoundA = { group: 'A', rounds: roundsByGroup[0] };
		const newRoundB = { group: 'B', rounds: roundsByGroup[1] };

		await message.channel.send(returnEmbedMessage('rounds', newRoundA));
		await message.channel.send(returnEmbedMessage('rounds', newRoundB));

	},
};