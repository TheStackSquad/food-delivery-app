//backend/router/userRoutes.js
const express = require('express');
const userRouter = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userProfileUpload = require('../middleware/userProfileMulter');
const userController = require('../controllers/userController');

const {
  signup,
  login,
  uploadProfileImage,
  getProfile,
  refreshUserToken
} = userController;

// User Routes
userRouter.post('/signup', signup); // User signup

userRouter.post('/login', login); // User login

userRouter.get('/login/dashboard', authMiddleware, getProfile); // Get user profile

userRouter.post('/login/dashboard', 
  authMiddleware,
  userProfileUpload.single('file'),  // Multer 
  uploadProfileImage  // controller
);

userRouter.post('/refresh-session', refreshUserToken); 

module.exports = userRouter;