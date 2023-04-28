const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/catchAsync');
const components = require('../controllers/components');

router.route('/').post(wrapAsync(components.createComponent));

module.exports = router;
