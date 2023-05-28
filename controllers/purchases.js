const Purchase = require('../models/purchase');
const Component = require('../models/component');
const Category = require('../models/category');

module.exports.getPurchases = async (req, res) => {
	const purchases = await Purchase.find({});
	res.json(purchases);
};

module.exports.createPurchase = async (req, res) => {
	// Crear una copia de req.body
	const body = { ...req.body };
	// Aplicar trim() a cada valor de cadena en body
	Object.keys(body).forEach((key) => {
		if (typeof body[key] === 'string') {
			body[key] = body[key].trim();
		}
	});
	const UniqueSerial = await Component.findOne({ serial: req.body.serial });
	if (UniqueSerial) {
		res.json({ error: `El número de serie debe ser único` });
	} else {
		const purchase = new Purchase(body);
		const categoryFound = await Category.findOne({
			category: req.body.category,
		});
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
			brand: brand.trim(),
			model: model.trim(),
			serial: serial.trim(),
			properties: properties.trim(),
			category,
			status,
			box,
			price,
			currency,
		});
		categoryFound.components.push(component);
		purchase.components.push(component);
		await component.save();
		await categoryFound.save();
		await purchase.save();
		res.json({
			message: `Compra añadida correctamente`,
		});
	}
};

module.exports.editPurchase = async (req, res) => {
	const { id } = req.params;
	// Crear una copia de req.body
	const body = { ...req.body };
	// Aplicar trim() a cada valor de cadena en body
	Object.keys(body).forEach((key) => {
		if (typeof body[key] === 'string') {
			body[key] = body[key].trim();
		}
	});
	const UniqueSerial = await Component.findOne({ serial: req.body.serial });
	if (UniqueSerial) {
		res.json({ error: `El número de serie debe ser único` });
	} else {
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

		const purchase = await Purchase.findById(id).populate('components');

		if (!purchase.components.length) {
			await Purchase.findByIdAndUpdate(id, body);
			res.json({
				message: `Compra modificada exitosamente`,
			});
		} else {
			const componentPurchased = await Component.findById(
				purchase.components[0]._id
			);
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
						brand: brand.trim(),
						model: model.trim(),
						serial: serial.trim(),
						properties: properties.trim(),
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
						brand: brand.trim(),
						model: model.trim(),
						serial: serial.trim(),
						properties: properties.trim(),
						category,
						status,
						box,
						price,
						currency,
					}
				);
			}
			await Purchase.findByIdAndUpdate(id, body);
			res.json({
				message: `Compra modificada exitosamente`,
			});
		}
	}
};
