// backend/router/routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { signup, login } = userController;
const authMiddleware = require('../middleware/authMiddleware');
const path = require('path');
const multer = require('multer');

// POST /api/signup
router.post('/signup', signup);

// POST /api/login
router.post('/login', login);


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
