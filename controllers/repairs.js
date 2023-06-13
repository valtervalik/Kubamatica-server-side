const Repair = require('../models/repair');

module.exports.getRepairs = async (req, res) => {
	const repairs = await Repair.find({});
	if (!repairs) {
		res.json({ error: `No se encontraron servicios de reparación` });
	} else {
		res.json(repairs);
	}
};

module.exports.createRepair = async (req, res) => {
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
	const repair = new Repair(body);
	await repair.save();
	res.json({ message: `Servicio de reparación añadido exitosamente` });
};

module.exports.editRepair = async (req, res) => {
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
	const editRepair = await Repair.findByIdAndUpdate(id, body);
	res.json({ message: 'Servicio de reparación modificado exitosamente' });
};
