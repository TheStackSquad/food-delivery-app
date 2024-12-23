//backend/router/vendorRoutes.js
const express = require('express');
const riderRouter = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const riderController = require('../controllers/riderController');

const {
  riderSignup,
  riderLogin,
  updateRiderProfile,
  updateRiderPayout,
  updateRiderAchievements,
} = riderController;

// Rider Routes
riderRouter.post('/signup', riderSignup); // Rider signup

riderRouter.post('/login', riderLogin); // Rider login

riderRouter.patch(
  '/updateProfile',
  authMiddleware,
  updateRiderProfile
); // Update rider profile

riderRouter.patch(
  '/updatePayout',
  authMiddleware,
  updateRiderPayout
); // Update rider payout

riderRouter.patch(
  '/updateAchievements',
  authMiddleware,
  updateRiderAchievements
); // Update rider achievements

module.exports = riderRouter;