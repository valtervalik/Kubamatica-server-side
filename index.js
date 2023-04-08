const express = require('express');
const app = express();
const port = 5000;
//connecting to the mongo database
const mongoose = require('mongoose');

main().catch((err) => console.log(err));

async function main() {
	await mongoose.connect('mongodb://127.0.0.1:27017/Kubamatica');
	console.log('MongoDB connected');
	// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get('/', (req, res) => {
	res.send('Home');
});

app.listen(port, (req, res) => {
	console.log(`Server is running on port ${port}`);
});
