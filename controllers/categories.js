const Category = require('../models/category');

module.exports.getCategories = async (req, res) => {
	const categories = await Category.find({});
	res.json(categories);
};

module.exports.addCategory = async (req, res) => {
	// Crear una copia de req.body
	const body = { ...req.body };
	// Aplicar trim() a cada valor de cadena en body
	Object.keys(body).forEach((key) => {
		if (typeof body[key] === 'string') {
			body[key] = body[key].trim();
		}
	});
	// Crear un nuevo objeto Category con los valores modificados
	const newCategory = new Category(body);
	await newCategory.save();
	res.json({ message: `Categoría ${req.body.category} añadida exitosamente` });
};

module.exports.editCategory = async (req, res) => {
	const { id } = req.params;
	const body = { ...req.body };
	Object.keys(body).forEach((key) => {
		if (typeof body[key] === 'string') {
			body[key] = body[key].trim();
		}
	});
	const category = await Category.findByIdAndUpdate(id, body);
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
