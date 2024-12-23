// backend/middleware/userProfileMulter.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { generateUserProfileFileName } = require('./multerUtils');

// Ensure the upload folder exists, or create it
const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true }); // Creates the folder and any missing parent directories
    console.log(`Directory created: ${directory}`);
  }
};

// Configure multer storage with custom filename generation and file filtering
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/userProfile');
    ensureDirectoryExists(uploadPath); // Ensure the userProfile directory exists
    cb(null, uploadPath); // Set the destination folder
  },
  filename: (req, file, cb) => {
    // Use the generateFileName function from multerUtils.js
    const fileName = generateUserProfileFileName(req, file);
    cb(null, fileName); // Set the filename for the uploaded file
  }
});

// Configure multer with file size limits and allowed file types
const userProfileUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Only allow image files (png, jpg, jpeg, gif, webp)
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      return cb(new Error('Only image files are allowed!'), false);
    }
  }
});

module.exports = userProfileUpload;
