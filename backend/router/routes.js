// backend/router/routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { signup, login } = userController;
const authMiddleware = require('../middleware/authMiddleware');
const path = require('path');

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

router.post('/uploadProfilePicture', authMiddleware, upload.single('profilePicture'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' })
    }
    return res.status(200).json({ message: 'Profile pictire uploaded successfully', filePath: req.file.path });
});

// Protected route
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;
