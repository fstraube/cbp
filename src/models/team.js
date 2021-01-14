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
	group: String,
	wins: Number,
	defeats: Number,
	cups: Number,
	ab: Number,
}, { timestamp: true });

teamSchema.statics.create = async (newTeam) => {
	const team = new Team(newTeam);
	return team
		.save().catch(err => {
			throw new Error(err);
		});
};

const Team = mongoose.model('Team', teamSchema);

export default Team;