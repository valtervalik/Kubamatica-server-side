const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
	res.send('Home');
});

app.listen(port, (req, res) => {
	console.log(`Server is running on port ${port}`);
});
