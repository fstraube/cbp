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

		const rounds = groups.map(group => (
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

		const newRoundA = { group: 'A', rounds: rounds[0] };
		await Round.create(newRoundA).catch(err => console.error(err.message));
		const newRoundB = { group: 'B', rounds: rounds[1] };
		await Round.create(newRoundB).catch(err => console.error(err.message));

		await message.channel.send(returnEmbedMessage('rounds', newRoundA));
		await message.channel.send(returnEmbedMessage('rounds', newRoundB));

	},
};