const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/catchAsync');
const purchases = require('../controllers/purchases');

router
	.route('/')
	.get(purchases.getPurchases)
	.post(wrapAsync(purchases.createPurchase));

router.route('/:id').put(wrapAsync(purchases.editPurchase));

module.exports = router;
