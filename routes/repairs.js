const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/catchAsync');
const repairs = require('../controllers/repairs');

router.route('/').post(wrapAsync(repairs.createRepair));

module.exports = router;
