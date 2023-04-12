const User = require('../models/user');

module.exports.registerUser = async (req, res, next) => {
	try {
		const { email, username, role, fullname, phone, password } = req.body;
		const user = new User({ role, fullname, phone, email, username });
		const registeredUser = await User.register(user, password);
		res.send('Usuario creado exitosamente');
	} catch (err) {
		return next(err);
	}
};
