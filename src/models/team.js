import mongoose from 'mongoose';
import { memberSchenma } from './member';

const teamSchenma = new mongoose.Schema(
	{
		teamname: {
			type: String,
			unique: true,
			required: true,
		},
		palyer: [memberSchenma],
	},
	{ timestamp: true },
);

const Team = mongoose.model('Team', teamSchenma);

export default Team;