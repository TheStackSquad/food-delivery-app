const express = require('express');
const router = express.Router();
const path = require('path');
const debug = require('debug')('app:routes'); // Debug for logging

// Middleware
const authMiddleware = require('../middleware/authMiddleware'); // For protected routes
const { vendorProfileUpload } = require('../middleware/multer');  // Correctly import the middleware


// Controllers
const userController = require('../controllers/userController');
const riderController = require('../controllers/riderController');
const vendorController = require('../controllers/vendorController');

// Destructure user-related controller functions
const { signup, login, getProfile } = userController;

// Destructure rider-related controller functions
const { 
    riderSignup, 
    riderLogin, 
    updateRiderProfile, 
    updateRiderPayout, 
    updateRiderAchievements 
} = riderController;

// Destructure vendor-related controller functions
const { 
    registerVendor, 
    loginVendor, 
    getVendorProfile, 
    updateVendorProfile, 
    addMealToMenu, 
    getVendorMenu 
} = vendorController;

// Multer setup for user profile picture upload
const multer = require('multer');

//User signup route
router.post('/signup', signup);


//User login route
router.post('/login', login);


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

/**
 * Routes for vendor-related operations
 */

// Vendor signup route
router.post('/vendor/signup', registerVendor);

// Vendor login route
router.post('/vendor/login', loginVendor);

// Get vendor profile
router.get('/vendor/profile', authMiddleware, getVendorProfile);

// Update vendor profile
router.put('/vendor/profile', authMiddleware, updateVendorProfile);

// Add meal to vendor's menu
router.post('/vendor/menu', authMiddleware, addMealToMenu);

// Get vendor menu
router.get('/vendor/menu', authMiddleware, getVendorMenu);

debug('Routes initialized.');

// user image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });

/**
 * ==========================
 * User-Related Routes
 * ==========================
 */
router.post('/signup', signup); // User signup
router.post('/login', login);   // User login
router.get('/profile', authMiddleware, getProfile); // Get user profile (protected route)
//router.post('/login/dashboard', updateProfilePicture); // User profile picture upload

/**
 * ==========================
 * Rider-Related Routes
 * ==========================
 */
router.post('/rider/signup', riderSignup); // Rider signup
router.post('/rider/login', riderLogin);   // Rider login

// Rider profile updates
router.patch('/rider/updateProfile', authMiddleware, updateRiderProfile); // Update profile
router.patch('/rider/updatePayout', authMiddleware, updateRiderPayout);   // Update payout
router.patch('/rider/updateAchievements', authMiddleware, updateRiderAchievements); // Update achievements

/**
 * ==========================
 * Vendor-Related Routes
 * ==========================
 */
router.post('/vendor/signup', registerVendor); // Vendor signup
router.post('/vendor/login', loginVendor);     // Vendor login
router.get('/vendor/profile',
    authMiddleware,
    vendorProfileUpload,
    getVendorProfile); // Get vendor profile

// Vendor profile update
router.post(
    '/vendor/profile', 
    authMiddleware, 
    vendorProfileUpload, 
    updateVendorProfile
); // Post vendor profile

// Vendor menu management
router.post('/vendor/menu', authMiddleware, addMealToMenu); // Add meal
router.get('/vendor/menu', authMiddleware, getVendorMenu);  // Get menu

// Initialize debug logging
debug('Routes initialized.');

module.exports = router;
