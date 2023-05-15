const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/catchAsync');
const sells = require('../controllers/sells');

router.route('/').get(sells.getSells).post(wrapAsync(sells.createSell));

router.route('/:id').put(wrapAsync(sells.editSell));

module.exports = router;
