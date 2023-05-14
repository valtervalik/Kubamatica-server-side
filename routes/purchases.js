const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/catchAsync');
const purchases = require('../controllers/purchases');

router.route('/').post(wrapAsync(purchases.createPurchase));

module.exports = router;
