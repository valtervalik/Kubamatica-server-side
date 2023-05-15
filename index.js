const express = require('express');
const app = express();
const port = 5000;

//importar paquetes
const ExpressError = require('./utils/expressError');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cors = require('cors');
const cookieParser = require('cookie-parser');

//importar modelos
const User = require('./models/user');

//importar rutas
const usersRoutes = require('./routes/users');
const categoriesRoutes = require('./routes/categories');
const componentsRoutes = require('./routes/components');
const repairsRoutes = require('./routes/repairs');
const purchasesRoutes = require('./routes/purchases');

//connecting to the mongo database
const mongoose = require('mongoose');

main().catch((err) => console.log(err));

async function main() {
	await mongoose.connect('mongodb://127.0.0.1:27017/Kubamatica');
	console.log('MongoDB connected');
	// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const sessionConfig = {
	name: 'kubamaticasession',
	secret: 'thisshouldbeabettersecret',
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		// secure:true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
};
app.use(session(sessionConfig));
// app.use(cookieParser('thisshouldbeabettersecret'));
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
	res.send('Home');
});

app.use('/users', usersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/components', componentsRoutes);
app.use('/repairs', repairsRoutes);
app.use('/purchases', purchasesRoutes);

// app.all('*', (req, res, next) => {
// 	next(new ExpressError('Page Not Found', 404));
// });

// app.use((err, req, res, next) => {
// 	const { statusCode = 500 } = err;
// 	if (!err.message) err.message = 'Something Went Wrong';
// 	res.status(statusCode).json({ error: err });
// });

// app.use(function (err, req, res, next) {
// 	console.error(err.stack);
// 	res.status(500).send('Algo salió mal');
// });

app.listen(port, (req, res) => {
	console.log(`Server is running on port ${port}`);
});
