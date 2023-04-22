const Category = require('../models/category');

module.exports.getCategories = async (req, res) => {
	const categories = await Category.find({});
	res.json(categories);
};

module.exports.addCategory = async (req, res) => {
	const newCategory = new Category(req.body);
	await newCategory.save();
	res.json({ message: `Categoría ${req.body.category} añadida exitosamente` });
};
