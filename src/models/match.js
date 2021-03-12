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

matchSchema.statics.createMatch = async (data) => {
	try {
		const newMatch = new Match(data);
		const match = newMatch.save();
		return match;
	}
	catch (error) {
		throw new Error(error);
	}
};
matchSchema.statics.updateMatch = async (homeTeam, awayTeam, updateData) => {
	try {
		const match = await Match.findOne({ $and: [{ homeTeam, awayTeam }] });
		console.log(match);
		if (match.winner === null && match.loser === null) {
			match.cups = updateData.cups;
			match.winner = updateData.winner;
			match.wabs = updateData.wabs;
			match.loser = updateData.loser;
			match.labs = updateData.labs;
			const updatedMatch = await match.save();
			return updatedMatch;
		}
		else {
			throw new Error('result exists');
		}
	}
	catch (error) {
		throw new Error(error);
	}
};

const Match = mongoose.model('Match', matchSchema);

export default Match;