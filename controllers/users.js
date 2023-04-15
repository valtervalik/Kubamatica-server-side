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
		res.json({ message: 'Usuario creado exitosamente' });
	} catch (err) {
		return next(err);
	}
};
