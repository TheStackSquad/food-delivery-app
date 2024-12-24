//backend/midleware/riderProfileMulter
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { generateFileName, overwriteExistingFiles } = require('./multerUtils');

// Directory path for vendorProfile
const vendorProfileDirectory = path.join(__dirname, '../uploads/riderProfile');

// Ensure directory exists
if (!fs.existsSync(riderProfileDirectory)) {
  fs.mkdirSync(vendorProfileDirectory, { recursive: true });
  console.log(`[MULTER] Created upload directory: ${riderProfileDirectory}`);
}

// Multer storage configuration for vendorProfile
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      // Overwrite existing files for this user
      const riderId = req.rider.riderId;
      overwriteExistingFiles(riderProfileDirectory, riderId);
      console.log(`[MULTER] Saving profile file to: ${riderProfileDirectory}`);
      cb(null, riderProfileDirectory);
    } catch (err) {
      console.error(`[MULTER] Error in destination: ${err.message}`);
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const filename = generateFileName(req, file);
    console.log(`[MULTER] Generated filename for profile: ${filename}`);
    cb(null, filename);
  },
});

// Multer upload configuration
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPEG, PNG, JPG, and WebP are allowed.'));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Middleware for vendor profile uploads
const riderProfileUpload = (req, res, next) => {
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      console.error('[MULTER] Error during upload:', err.message);
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

module.exports = { riderProfileUpload };

