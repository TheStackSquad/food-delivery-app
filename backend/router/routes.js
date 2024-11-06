// backend/router/routes.js
const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/userController');

// POST /api/signup
router.post('/signup', signup);

module.exports = router;
