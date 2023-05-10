const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/catchAsync');
const components = require('../controllers/components');

router.route('/').post(wrapAsync(components.createComponent));

router.route('/:category').get(wrapAsync(components.getCategoryComponents));

router
	.route('/:category/:id')
	.put(wrapAsync(components.editComponent))
	.delete(wrapAsync(components.deleteComponent));

module.exports = router;
