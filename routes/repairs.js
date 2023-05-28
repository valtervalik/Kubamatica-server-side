const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/catchAsync');
const repairs = require('../controllers/repairs');
const { validateRepair } = require('../middleware');

router
	.route('/')
	.get(wrapAsync(repairs.getRepairs))
	.post(wrapAsync(validateRepair, repairs.createRepair));

router.route('/:id').put(validateRepair, wrapAsync(repairs.editRepair));

module.exports = router;
