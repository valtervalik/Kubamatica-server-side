const mongoose = require('mongoose');
const { Schema } = mongoose;

const Component = require('./component');

const CategorySchema = new Schema({
	category: String,
	components: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Component',
		},
	],
});

CategorySchema.post('findOneAndDelete', async function (doc) {
	if (doc) {
		await Component.deleteMany({
			_id: {
				$in: doc.components,
			},
		});
	}
});

module.exports = mongoose.model('Category', CategorySchema);
