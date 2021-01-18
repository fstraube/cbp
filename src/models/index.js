import mongoose from 'mongoose';

import Tournament from './tournament.js';
import Team from './team.js';
import Match from './match.js';

const dbOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
};


const connectDb = () => {
	return mongoose.connect(process.env.DB_CONNECTION_TOURNAMENT, dbOptions);
};

const models = { Team, Tournament, Match };

export { connectDb };

export default models;