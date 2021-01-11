import mongoose from 'mongoose';

// import User from './user';
// import Message from './message';

const dbOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
};


const connectDb = () => {
	return mongoose.connect(process.env.DB_CONNECTION_TOURNAMENT, dbOptions);
};

// const models = { User, Message };

export { connectDb };

// export default models;