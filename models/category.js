const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
	category: String,
	components: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Component',
		},
	],
});

module.exports = mongoose.model('Category', CategorySchema);
