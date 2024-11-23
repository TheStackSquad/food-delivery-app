// backend/router/routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // For protected routes
const debug = require('debug')('app:routes'); // Debug instance for logging
const path = require('path');
const multer = require('multer');

const riderController = require('../controllers/riderController');
const userController = require('../controllers/userController');
const vendorController = require('../controllers/vendorController');

const { signup, login } = userController;

// Destructure rider-related controller functions
const { riderSignup, riderLogin, updateRiderProfile, updateRiderPayout, updateRiderAchievements } = riderController;
// Desctructure vendor-related controller functions
const { registerVendor, loginVendor, getVendorProfile, updateVendorProfile, addMealToMenu, getVendorMenu } = vendorController;

/**
 * Routes for user-related operations
 */

// User signup route
router.post('/signup', signup);
// User login route
router.post("/login", login);

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
router.post('/vendor/register', registerVendor);

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
        cb(null, `${req.user.id} -${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

router.post('/uploadProfilePicture', authMiddleware, upload.single('profilePicture'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.profilePicture = req.file.path;
        await user.save();

        res.status(200).json({ message: 'Profile picture uploaded successfully', filePath: req.file.path });
    } catch (error) {
        res.status(500).json({ message: 'Error saving profile picture', error });
    }
});

// Protected route
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;
