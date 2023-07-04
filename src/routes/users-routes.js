const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');
const { authenticateUser } = require('../middlewares/auth');
const User = require('../models/User');

router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.get('/protected', authenticateUser, usersController.protectedRoute);

module.exports = router;
