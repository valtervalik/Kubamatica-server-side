const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/catchAsync');
const categories = require('../controllers/categories');
const { validateCategory } = require('../middleware');

router
	.route('/')
	.get(wrapAsync(categories.getCategories))
	.post(validateCategory, wrapAsync(categories.addCategory));

router
	.route('/:id')
	.put(validateCategory, wrapAsync(categories.editCategory))
	.delete(wrapAsync(categories.deleteCategory));

module.exports = router;
