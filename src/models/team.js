import mongoose from 'mongoose';

export const teamSchema = new mongoose.Schema({
	id: String,
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

teamSchema.statics.create = async (newTeam) => {
	const team = new Team(newTeam);
	console.log(team);
	return team
		.save();
};

const Team = mongoose.model('Team', teamSchema);

export default Team;