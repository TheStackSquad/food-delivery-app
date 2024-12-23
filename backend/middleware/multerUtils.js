//backend/middleware/multerUtils
const path = require('path');
const fs = require('fs');

// Utility to overwrite existing files
const overwriteExistingFiles = (directory, identifier) => {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    if (file.includes(identifier)) {
      const filePath = path.join(directory, file);
      fs.unlinkSync(filePath);
      console.log(`[MULTER] Deleted existing file: ${filePath}`);
    }
  });
};

// File name generation strategy
const generateFileName = (req, file) => {
  const vendorId = req?.vendor?.vendorId;
  console.log('Request User:', req?.vendor?.vendorId);

const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
return `vendor-${vendorId}-${uniqueSuffix}${path.extname(file.originalname)}`;

};


const generateUserProfileFileName = (req, file) => {
  // Extract user ID from authenticated request
  const userId = req.user.userId;
  
  // Create a unique filename with user ID, timestamp, and original extension
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  return `user-${userId}-profilePic-${uniqueSuffix}${path.extname(file.originalname)}`;
};

module.exports = {
  generateFileName,
  generateUserProfileFileName,
  overwriteExistingFiles,
};