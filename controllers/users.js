const User = require('../models/user');

module.exports.getUsers = async (req, res) => {
	const users = await User.find({});
	users && res.status(200).json(users);
};

module.exports.registerUser = async (req, res, next) => {
	try {
		const { email, username, role, fullname, phone, password } = req.body;
		const user = new User({ role, fullname, phone, email, username });
		const registeredUser = await User.register(user, password);
		res.json({
			message: `Usuario ${registeredUser.username} añadido exitosamente`,
		});
	} catch (err) {
		return next(err);
	}
};

module.exports.deleteUser = async (req, res) => {
	const { id } = req.params;
	const user = await User.findByIdAndDelete(id);
	res.json({ message: `Usuario ${user.username} eliminado exitosamente` });
};
