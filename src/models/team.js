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
		cups: { type: Number, default: 0 },
		abs: { type: Number, default: 0 },
		wins: { type: Number, default: 0 },
		defeats: { type: Number, default: 0 },
	},
}, { unique: true, timestamp: true });

teamSchema.statics.createTeam = async (newTeam) => {
	const team = new Team(newTeam);
	return team
		.save().catch(err => {
			throw new Error(err);
		});
};

teamSchema.statics.updateTeam = async (teamname, updateData) => {
	const updatedTeam = await Team.updateOne(teamname, updateData).catch(err => {
		throw new Error(err);
	});

	return updatedTeam;
};

const Team = mongoose.model('Team', teamSchema);

export default Team;