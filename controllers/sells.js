const Sell = require('../models/sell');
const Component = require('../models/component');
const Category = require('../models/category');

module.exports.createSell = async (req, res) => {
	const newSell = new Sell(req.body);

	const deletedComponent = await Component.findOneAndDelete({
		serial: req.body.serial,
	});

	const delcategory = await Category.findOneAndUpdate(
		{ category: deletedComponent.category },
		{
			$pull: { components: deletedComponent._id },
		}
	);

	await newSell.save();

	res.json({ message: `Venta añadida exitosamente` });
};
