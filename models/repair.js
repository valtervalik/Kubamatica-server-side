const mongoose = require('mongoose');
const { Schema } = mongoose;

const RepairSchema = new Schema({
	client: String,
	phone: String,
	technic: String,
	warranty: Number,
	device: String,
	description: String,
	box: Number,
	date: { year: Number, month: Number, day: Number, dayOfWeek: String },
	price: Number,
	currency: {
		type: String,
		enum: ['cup', 'usd'],
	},
});

module.exports = mongoose.model('Repair', RepairSchema);
