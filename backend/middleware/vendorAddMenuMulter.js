const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { generateFileName } = require('./multerUtils');


// Directory path for vendorProfile
const vendorAddMenuDirectory = path.join(__dirname, '../uploads/vendorAddMenu');

// Ensure directory exists
if (!fs.existsSync(vendorAddMenuDirectory)) {
  fs.mkdirSync(vendorAddMenuDirectory, { recursive: true });
  console.log(`[MULTER] Created upload directory: ${vendorAddMenuDirectory}`);
}

// Storage configuration for vendor menu uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      console.log(`[MULTER] Saving menu file to: ${vendorAddMenuDirectory}`);
      cb(null, vendorAddMenuDirectory); // Use the directory path as a string
    } catch (err) {
      console.error(`[MULTER] Error in destination: ${err.message}`);
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const filename = generateFileName(req, file);
    console.log(`[MULTER] Generated filename for menu: ${filename}`);
    cb(null, filename);
  },
});

// Multer upload configuration
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type for menu. Only JPEG, PNG, JPG, and WebP are allowed.'));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Middleware for vendor menu uploads
const vendorMenuUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('[MULTER] Error during menu upload:', err.message);
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

module.exports = { vendorMenuUpload };
