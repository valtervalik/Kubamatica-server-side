const Category = require('../models/category');
const Component = require('../models/component');
const Purchase = require('../models/purchase');

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
	const body = { ...req.body };
	// Aplicar trim() a cada valor de cadena en body
	Object.keys(body).forEach((key) => {
		if (typeof body[key] === 'string') {
			body[key] = body[key].trim();
		}

		if (key === 'price') {
			// Convertir el valor de 'precio' en un número y aplicar toFixed(2)
			body[key] = parseFloat(body[key]).toFixed(2);
		}
	});
	const category = await Category.findOne({ category: req.body.category });
	const serial = await Component.findOne({ serial: req.body.serial });
	if (!category) {
		res.json({ error: `La categoría no existe` });
	} else if (serial) {
		res.json({ error: `El número de serie debe ser único` });
	} else {
		// Crear una copia de req.body
		const component = new Component(body);
		category.components.push(component);
		await component.save();
		await category.save();
		res.json({
			message: `Componente añadido correctamente a ${req.body.category}`,
		});
	}
};

module.exports.editComponent = async (req, res) => {
	const { id } = req.params;
	// Crear una copia de req.body
	const body = { ...req.body };
	// Aplicar trim() a cada valor de cadena en body
	Object.keys(body).forEach((key) => {
		if (typeof body[key] === 'string') {
			body[key] = body[key].trim();
		}

		if (key === 'price') {
			// Convertir el valor de 'precio' en un número y aplicar toFixed(2)
			body[key] = parseFloat(body[key]).toFixed(2);
		}
	});
	const serial = await Component.findOne({ serial: req.body.serial });
	if (serial) {
		res.json({ error: `El número de serie debe ser único` });
	} else {
		const newComponent = await Component.findByIdAndUpdate(id, body);
		res.json({ message: `Componente modificado exitosamente` });
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
	const delpurchase = await Purchase.findOneAndUpdate(
		{ serial: component.serial },
		{ $pull: { components: id } }
	);
	res.json({ message: `Componente eliminado exitosamente` });
};
