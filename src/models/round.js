import mongoose from 'mongoose';

export const roundSchema = new mongoose.Schema({
	group: {
		type: String,
		unique: true,
		required: true,
	},
	rounds: {
		type: [Object],
		default: undefined,
		unique: true,
		required: true,
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