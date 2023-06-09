const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

const wrapAsync = require('../utils/catchAsync');
const { validateUser } = require('../middleware');

router.route('/').get(wrapAsync(users.getUsers));

router
	.route('/:id')
	.delete(wrapAsync(users.deleteUser))
	.put(wrapAsync(users.editUser));

router.route('/changepassword').post(wrapAsync(users.changePassword));

router.route('/recoverpassword').post(wrapAsync(users.recoverPassword));

router.route('/register').post(validateUser, wrapAsync(users.registerUser));

router.route('/login').post(wrapAsync(users.loginUser));

router.route('/logout').post(users.logout);

module.exports = router;
