const User = require('../models/user');
const passport = require('passport');
const nodemailer = require('nodemailer');

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

module.exports.changePassword = async (req, res) => {
	await User.findByUsername(req.body.username, (err, user) => {
		if (err) {
			res.status(400).json(err);
		} else {
			user.changePassword(
				req.body.password,
				req.body.newpassword,
				function (err) {
					if (err) {
						res.status(400).json(err);
					} else {
						res.json({ message: 'Contraseña actualizada exitosamente' });
					}
				}
			);
		}
	});
};

module.exports.recoverPassword = async (req, res) => {
	function generarContrasena(longitud) {
		var caracteres =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
		var contrasena = '';
		var tieneMayuscula = false;
		var tieneNumero = false;
		var tieneCaracterEspecial = false;
		while (!tieneMayuscula || !tieneNumero || !tieneCaracterEspecial) {
			contrasena = '';
			for (var i = 0; i < longitud; i++) {
				var caracter = caracteres.charAt(
					Math.floor(Math.random() * caracteres.length)
				);
				contrasena += caracter;
				if (caracter.match(/[A-Z]/)) {
					tieneMayuscula = true;
				}
				if (caracter.match(/[0-9]/)) {
					tieneNumero = true;
				}
				if (caracter.match(/[!@#$%^&*()]/)) {
					tieneCaracterEspecial = true;
				}
			}
		}
		return contrasena;
	}
	const { email } = req.body;
	const foundUser = await User.findOne({ email: email });
	if (!foundUser) {
		res.json({
			error: `Lo sentimos, su correo no pertenece a nuestra empresa`,
		});
	} else {
		const contrasena = await generarContrasena(25);

		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'tallerkubamatica@gmail.com',
				pass: 'dodurjwxyusensyw',
			},
		});

		let mailOptions = {
			from: 'tallerkubamatica@gmail.com',
			to: foundUser.email,
			subject: 'Nueva Contraseña',
			text: `Puede iniciar sesión en Kubamatica con la siguiente contraseña: ${contrasena}`,
		};

		await foundUser.setPassword(contrasena, function (error) {
			if (error) {
				res.status(400).json({
					error:
						'Lo sentimos. No fue posible actualizar su contraseña. Inténtelo de nuevo',
					error,
				});
			} else {
				foundUser.save();
				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						res.json({
							error: `No se pudo enviar un correo a ${foundUser.email}`,
							error,
						});
					} else {
						res.json({
							message: `Contraseña actualizada exitosamente. Compruebe su correo para obtener su nueva contraseña`,
							info,
						});
					}
				});
			}
		});
	}
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

			req.session.user = user;

			res.status(200).json({
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
