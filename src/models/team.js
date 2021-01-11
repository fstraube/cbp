import mongoose from 'mongoose';

export const teamSchema = new mongoose.Schema({
	teamname: {
		type: String,
		unique: true,
		required: true,
	},
	teammembers: {
		type: [String],
		default: undefined,
	},
}, { timestamp: true });

teamSchema.statics.createTeam = async (teamname, teammembers) => {
	const newTeam = new Team({ teamname, teammembers });
	return newTeam
		.save();
};

const Team = mongoose.model('Team', teamSchema);

export default Team;