import mongoose from 'mongoose';

export const matchSchema = new mongoose.Schema({
	group: String,
	round: Number,
	home: String,
	away: String,
	cups: Number,
	winner: String,
	wab: Number,
	loser: String,
	lab: Number,
}, { unique: true, timestamp: true });

matchSchema.statics.create = async (newMatch) => {
	const match = new Match(newMatch);
	return match
		.save().catch(err => {
			throw new Error(err);
		});
};

const Match = mongoose.model('Match', matchSchema);

export default Match;