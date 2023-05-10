const Repair = require('../models/repair');

module.exports.createRepair = async (req, res) => {
	const repair = new Repair(req.body);
	await repair.save();
	res.json({ message: `Servicio de reparación añadido exitosamente` });
};
