const mongoose = require('mongoose');
const { Schema } = mongoose;

const RepairSchema = new Schema({
	client: String,
	phone: String,
	technic: String,
	warranty: String,
	device: String,
	description: String,
	box: Number,
	price: Number,
	currency: {
		type: String,
		enum: ['cup', 'usd'],
	},
});

module.exports = mongoose.model('Repair', RepairSchema);
