import mongoose from 'mongoose';

export const groupSchema = new mongoose.Schema({
	group: {
		type: String,
		unique: true,
		required: true,
	},
	teams: {
		type: [String],
		default: undefined,
		unique: true,
		required: true,
	},
}, { timestamp: true });

groupSchema.statics.create = async (newGroup) => {
	const group = new Group(newGroup);
	return group
		.save().catch(err => {
			throw new Error(err);
		});
};

const Group = mongoose.model('Group', groupSchema);

export default Group;