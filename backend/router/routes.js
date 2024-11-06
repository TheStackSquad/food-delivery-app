// backend/router/routes.js
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userController');

// POST /api/signup
router.post('/signup', signup);

// POST /api/login
router.post('/login', login);

module.exports = router;
