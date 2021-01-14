import mongoose from 'mongoose';

export const gameSchema = new mongoose.Schema({
	group: String,
	round: Number,
	cups: Number,
	winner: String,
	wab: Number,
	loser: String,
	lab: Number,
}, { unique: true, timestamp: true });

gameSchema.statics.create = async (newGame) => {
	const game = new Game(newGame);
	return game
		.save().catch(err => {
			throw new Error(err);
		});
};

const Game = mongoose.model('Game', gameSchema);

export default Game;