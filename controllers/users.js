const User = require('../models/user');
const passport = require('passport');

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

module.exports.editUser = async (req, res) => {
	const { id } = req.params;
	const { ...user } = req.body;
	const editedUser = await User.findByIdAndUpdate(id, { ...user });
	res.json({ message: 'Usuario modificado exitosamente' });
};

module.exports.deleteUser = async (req, res) => {
	const { id } = req.params;
	const user = await User.findByIdAndDelete(id);
	res.json({ message: `Usuario ${user.username} eliminado exitosamente` });
};

module.exports.loginUser = async (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return res.status(500).json(err);
		}
		if (!user) {
			return res.status(400).json(info);
		}

		req.login(user, (err) => {
			if (err) {
				return res.status(500).json(err);
			}

			res.json({
				username: user.username,
				role: user.role,
				id: user._id,
				message: `Inicio de sesión exitoso. Bienvenido ${user.username}`,
			});
		});
	})(req, res, next);
};

module.exports.logout = (req, res, next) => {
	// req.logout();
	res.json({ message: 'Gracias por venir. Vuelva pronto.' });
	// next();
};
