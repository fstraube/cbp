import mongoose from 'mongoose';

export const teamSchema = new mongoose.Schema({
	id: String,
	name: {
		type: String,
		unique: true,
		required: true,
	},
	members: {
		type: [String],
		default: undefined,
	},
	group: {
		type: String, default: null,
	},
	stats:
	{
		cups: {
			type: Number, default: 0,
		},
		abs: {
			type: Number, default: 0,
		},
		wins: {
			type: Number, default: 0,
		},
		defeats: {
			type: Number, default: 0,
		},
	},
}, { unique: true, timestamp: true });

teamSchema.statics.createTeam = async (data) => {
	try {
		const newTeam = new Team(data);
		const team = await newTeam.save();
		return team;
	}
	catch (error) {
		throw new Error(error);
	}
};

teamSchema.statics.updateTeam = async (name, updateGroup) => {
	try {
		const updatedTeam = await Team.updateOne(name, updateGroup);
		return updatedTeam;
	}
	catch (error) {
		throw new Error(error);
	}
};

teamSchema.statics.updateTeamStats = async (name, updateData) => {
	try {
		const updatedTeam = await Team.updateOne(name, {
			$inc:
			{
				'stats.cups': updateData.cups,
				'stats.abs': updateData.abs,
				'stats.wins': updateData.wins,
				'stats.defeats': updateData.defeats,
			},
		});
		return updatedTeam;
	}
	catch (error) {
		throw new Error(error);
	}
};

const Team = mongoose.model('Team', teamSchema);

export default Team;