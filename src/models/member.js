import mongoose from 'mongoose';

export const memberSchenma = new mongoose.Schema(
	{
		_id: {
			type: String || Number,
			unique: true,
			required: true,
		},
	},
	{ timestamp: true },
);

const Member = mongoose.model('Menber', memberSchenma);

export default Member;