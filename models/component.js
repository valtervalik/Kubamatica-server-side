const mongoose = require('mongoose');
const { Schema } = mongoose;

const ComponentSchema = new Schema({
	brand: String,
	model: String,
	serial: {
		type: String,
		unique: true,
	},
	properties: String,
	category: String,
	status: {
		type: String,
		enum: ['Nuevo', 'Poco Uso', 'Usado'],
	},
	box: Number,
	price: Number,
	currency: {
		type: String,
		enum: ['cup', 'usd'],
	},
});

module.exports = mongoose.model('Component', ComponentSchema);
