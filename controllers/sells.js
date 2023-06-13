const Sell = require('../models/sell');
const Component = require('../models/component');
const Category = require('../models/category');
const Purchase = require('../models/purchase');

module.exports.getSells = async (req, res) => {
	const sells = await Sell.find({});
	res.json(sells);
};

module.exports.createSell = async (req, res) => {
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
	const newSell = new Sell(body);

	const deletedComponent = await Component.findOneAndDelete({
		serial: req.body.serial,
	});

	const delcategory = await Category.findOneAndUpdate(
		{ category: deletedComponent.category },
		{
			$pull: { components: deletedComponent._id },
		}
	);

	const delpurchase = await Purchase.findOneAndUpdate(
		{ serial: deletedComponent.serial },
		{ $pull: { components: deletedComponent._id } }
	);

	await newSell.save();

	res.json({ message: `Venta añadida exitosamente` });
};

module.exports.editSell = async (req, res) => {
	const { id } = req.params;
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
	const sell = await Sell.findByIdAndUpdate(id, body);
	res.json({ message: `Servicio de venta modificado exitosamente` });
};
