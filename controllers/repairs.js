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
	const repair = new Repair(req.body);
	await repair.save();
	res.json({ message: `Servicio de reparación añadido exitosamente` });
};
