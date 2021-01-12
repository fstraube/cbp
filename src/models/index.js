import mongoose from 'mongoose';

import Team from './team.js';
import Group from './group.js';
import Round from './round.js';

const dbOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
};


const connectDb = () => {
	return mongoose.connect(process.env.DB_CONNECTION_TOURNAMENT, dbOptions);
};

const models = { Team, Group, Round };

export { connectDb };

export default models;