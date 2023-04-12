const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

const wrapAsync = require('../utils/catchAsync');

router.route('/register').post(wrapAsync(users.registerUser));

module.exports = router;
