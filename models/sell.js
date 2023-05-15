const mongoose = require('mongoose');
const { Schema } = mongoose;

const SellSchema = new Schema({
	client: String,
	phone: String,
	technic: String,
	category: String,
	warranty: Number,
	box: Number,
	brand: String,
	model: String,
	serial: String,
	status: {
		type: String,
		enum: ['Nuevo', 'Poco Uso', 'Usado'],
	},
	properties: String,
	date: { year: Number, month: Number, day: Number, dayOfWeek: String },
	price: Number,
	currency: {
		type: String,
		enum: ['cup', 'usd'],
	},
});

module.exports = mongoose.model('Sell', SellSchema);
