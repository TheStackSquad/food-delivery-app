//backend/middlewrae/vendorAddMenuMulter.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { generateFileName } = require('./multerUtils');

// Create upload directory
const uploadDir = path.join(__dirname, '../uploads/vendorAddMenu');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = generateFileName(req, file);
    cb(null, filename);
  }
});

// Configure multer upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only .jpeg, .jpg, .png and .webp formats are allowed'));
    }
    cb(null, true);
  }
});

// Main middleware
const vendorMenuUpload = (req, res, next) => {
  // First check if vendor is authenticated
  if (!req.vendor?.vendorId) {
    return res.status(401).json({
      success: false,
      message: 'Vendor authentication required'
    });
  }

  // Handle the file upload
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: 'File upload error: ' + err.message
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }

    // Check if file was provided
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an image file'
      });
    }

    next();
  });
};

module.exports = {
  vendorMenuUpload
};