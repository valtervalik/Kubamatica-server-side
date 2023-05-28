const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/catchAsync');
const components = require('../controllers/components');
const { validateComponent } = require('../middleware');

router
	.route('/')
	.post(validateComponent, wrapAsync(components.createComponent));

router.route('/:category').get(wrapAsync(components.getCategoryComponents));

router
	.route('/:category/:id')
	.put(validateComponent, wrapAsync(components.editComponent))
	.delete(wrapAsync(components.deleteComponent));

module.exports = router;
