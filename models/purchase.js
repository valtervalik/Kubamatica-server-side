const mongoose = require('mongoose');
const { Schema } = mongoose;

const PurchaseSchema = new Schema({
	supplier: String,
	phone: String,
	category: String,
	status: {
		type: String,
		enum: ['Nuevo', 'Poco Uso', 'Usado'],
	},
	warranty: Number,
	box: Number,
	brand: String,
	model: String,
	serial: String,
	properties: String,
	date: { year: Number, month: Number, day: Number, dayOfWeek: String },
	price: Number,
	currency: {
		type: String,
		enum: ['cup', 'usd'],
	},
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
