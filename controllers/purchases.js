const Purchase = require('../models/purchase');
const Component = require('../models/component');
const Category = require('../models/category');

module.exports.getPurchases = async (req, res) => {
	const purchases = await Purchase.find({});
	res.json(purchases);
};

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

module.exports.editPurchase = async (req, res) => {
	const { id } = req.params;
	const { ...purchaseBody } = req.body;
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

	const componentPurchased = await Component.findOne({ serial: serial });

	if (category !== componentPurchased.category) {
		const pullCategory = await Category.findOneAndUpdate(
			{ category: componentPurchased.category },
			{
				$pull: { components: componentPurchased._id },
			}
		);

		const newCategory = await Category.findOne({ category: category });
		newCategory.components.push(componentPurchased);
		await newCategory.save();

		const updatedCategoryComponent = await Component.findByIdAndUpdate(
			componentPurchased._id,
			{
				brand,
				model,
				serial,
				properties,
				category,
				status,
				box,
				price,
				currency,
			}
		);
	} else {
		const updatedComponent = await Component.findByIdAndUpdate(
			componentPurchased._id,
			{
				brand,
				model,
				serial,
				properties,
				category,
				status,
				box,
				price,
				currency,
			}
		);
	}
	const purchase = await Purchase.findByIdAndUpdate(id, { ...purchaseBody });
	res.json({
		message: `Compra modificada exitosamente`,
	});
};
