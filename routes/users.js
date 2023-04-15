const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

const wrapAsync = require('../utils/catchAsync');

router.route('/').get(wrapAsync(users.getUsers));

router.route('/:id').delete(wrapAsync(users.deleteUser));

router.route('/register').post(wrapAsync(users.registerUser));

module.exports = router;
