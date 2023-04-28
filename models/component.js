const mongoose = require('mongoose');
const { Schema } = mongoose;

const ComponentSchema = new Schema({
	brand: String,
	model: String,
	serial: String,
	properties: String,
	category: String,
	status: String,
	box: Number,
	price: Number,
	currency: {
		type: String,
		enum: ['cup', 'usd'],
	},
});

module.exports = mongoose.model('Component', ComponentSchema);