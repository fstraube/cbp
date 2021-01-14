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
	stats: Object,
}, { timestamp: true });

teamSchema.statics.create = async (newTeam) => {
	const team = new Team(newTeam);
	return team
		.save().catch(err => {
			throw new Error(err);
		});
};

teamSchema.statics.update = async (id, stats) => {
	const updatedTeam = await Team.updateOne({ id }, { stats }).catch(err => {
		throw new Error(err);
	});

	return updatedTeam;
};

const Team = mongoose.model('Team', teamSchema);

export default Team;