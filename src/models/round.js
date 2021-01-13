import mongoose from 'mongoose';

export const roundSchema = new mongoose.Schema({
	group: {
		type: String,
	},
	round: {
		type: String,
	},
	matches: {
		type: [Object],
		default: undefined,
	},
}, { timestamp: true });

roundSchema.statics.create = async (newRound) => {
	const round = new Round(newRound);
	return round
		.save().catch(err => {
			throw new Error(err);
		});
};

const Round = mongoose.model('Round', roundSchema);

export default Round;