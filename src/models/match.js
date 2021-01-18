import mongoose from 'mongoose';

export const matchSchema = new mongoose.Schema({
	group: String,
	round: Number,
	homeTeam: String,
	awayTeam: String,
	cups: {
		type: Number, default: 0,
	},
	winner: {
		type: String, default: null,
	},
	wabs: {
		type: Number, default: 0,
	},
	loser: {
		type: String, default: null,
	},
	labs: {
		type: Number, default: 0,
	},
}, { unique: true, timestamp: true });

matchSchema.statics.create = async (data) => {
	try {
		const newMatch = new Match(data);
		const match = newMatch.save();
		return match;
	}
	catch (error) {
		throw new Error(error);
	}
};

const Match = mongoose.model('Match', matchSchema);

export default Match;