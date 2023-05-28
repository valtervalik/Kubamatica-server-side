const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/catchAsync');
const purchases = require('../controllers/purchases');
const { validatePurchase } = require('../middleware');

router
	.route('/')
	.get(purchases.getPurchases)
	.post(validatePurchase, wrapAsync(purchases.createPurchase));

router.route('/:id').put(validatePurchase, wrapAsync(purchases.editPurchase));

module.exports = router;
