import mongoose from 'mongoose';

const teamSchenma = new mongoose.Schema(
	{
		teamname: {
			type: String,
			unique: true,
			required: true,
		},
		palyer: [{
			type: String,
			unique: true,
			required: true,
		}],
	},
	{ timestamp: true },
);

const Team = mongoose.model('Team', teamSchenma);

export default Team;