// backend/router/routes.js
const express = require('express');
const router = express.Router();
const riderController = require('../controllers/riderController');
const authMiddleware = require('../middleware/authMiddleware'); // For protected routes
const debug = require('debug')('app:routes'); // Debug instance for logging

// Destructure rider-related controller functions
const { riderSignup, riderLogin, updateRiderProfile, updateRiderPayout, updateRiderAchievements } = riderController;

/**
 * Routes for rider-related operations
 */

// Rider signup route
router.post('/rider/signup', riderSignup);

//Rider Login router
router.post("/rider/login", riderLogin);


// Route to update rider profile (address, phone, delivery mode)
router.patch('/rider/updateProfile', authMiddleware, updateRiderProfile);

// Route to update rider payout information
router.patch('/rider/updatePayout', authMiddleware, updateRiderPayout);

// Route to update rider achievements (topRated, speedKing)
router.patch('/rider/updateAchievements', authMiddleware, updateRiderAchievements);

debug('Routes initialized.');

module.exports = router;
