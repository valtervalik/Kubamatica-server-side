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

module.exports.editCategory = async (req, res) => {
	const { id } = req.params;
	const { ...categoryBody } = req.body;
	const category = await Category.findByIdAndUpdate(id, { ...categoryBody });
	res.json({
		message: `Categoría ${
			category.category[0].toUpperCase() + category.category.substring(1)
		} modificada exitosamente`,
	});
};

module.exports.deleteCategory = async (req, res) => {
	const { id } = req.params;
	const category = await Category.findByIdAndDelete(id);
	res.json({
		message: `Categoría ${
			category.category[0].toUpperCase() + category.category.substring(1)
		} eliminada exitosamente`,
	});
};
