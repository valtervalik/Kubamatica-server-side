const Category = require('../models/category');
const Component = require('../models/component');

module.exports.getCategoryComponents = async (req, res) => {
	const { category } = req.params;
	const components = await Component.find({ category: category });
	if (!components) {
		res.json({ error: `No se encontraron componentes` });
	} else {
		res.json(components);
	}
};

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

module.exports.deleteComponent = async (req, res) => {
	const { category, id } = req.params;
	const component = await Component.findByIdAndDelete(id);
	const delcategory = await Category.findOneAndUpdate(
		{ category: category },
		{
			$pull: { components: id },
		}
	);
	res.json({ message: `Componente eliminado exitosamente` });
};
