const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/catchAsync');
const categories = require('../controllers/categories');

router
	.route('/')
	.get(wrapAsync(categories.getCategories))
	.post(wrapAsync(categories.addCategory));

module.exports = router;
