// backend/router/routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { signup, login } = userController;
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/signup
router.post('/signup', signup);

// POST /api/login
router.post('/login', login);

// Protected route
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;
