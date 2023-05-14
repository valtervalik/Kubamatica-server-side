const Purchase = require('../models/purchase');
const Component = require('../models/component');
const Category = require('../models/category');

module.exports.createPurchase = async (req, res) => {
	const purchase = new Purchase(req.body);
	const categoryFound = await Category.findOne({ category: req.body.category });
	const {
		brand,
		model,
		serial,
		properties,
		category,
		status,
		box,
		price,
		currency,
	} = req.body;

	const component = new Component({
		brand,
		model,
		serial,
		properties,
		category,
		status,
		box,
		price,
		currency,
	});
	categoryFound.components.push(component);
	await component.save();
	await categoryFound.save();
	await purchase.save();
	res.json({
		message: `Compra añadida correctamente`,
	});
};
