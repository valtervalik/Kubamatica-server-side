const Category = require('../models/category');
const Component = require('../models/component');

module.exports.createComponent = async (req, res) => {
	const category = await Category.findOne({ category: req.body.category });
	if (!category) {
		res.json({ error: `La categoría no existe` });
	} else {
		const component = new Component(req.body);
		category.components.push(component);
		await component.save();
		await category.save();
		res.json({
			message: `Componente añadido correctamente a ${req.body.category}`,
		});
	}
};
