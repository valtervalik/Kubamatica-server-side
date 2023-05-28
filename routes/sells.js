const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/catchAsync');
const sells = require('../controllers/sells');
const { validateSell } = require('../middleware');

router
	.route('/')
	.get(sells.getSells)
	.post(validateSell, wrapAsync(sells.createSell));

router.route('/:id').put(validateSell, wrapAsync(sells.editSell));

module.exports = router;
