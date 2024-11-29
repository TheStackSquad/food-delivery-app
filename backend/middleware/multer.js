//backend/middlewrae/multer.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads/vendorProfile');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`[MULTER] Created upload directory: ${uploadDir}`);
}

// File name generation strategy
const generateFileName = (req, file) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  return `vendor-${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`;
};

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`[MULTER] Attempting to save file: ${file.originalname}`);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = generateFileName(req, file);
    console.log(`[MULTER] Generated filename: ${filename}`);
    cb(null, filename);
  }
});

// File filter for image types and size
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  console.log(`[MULTER] File received: ${file.originalname}`);
  console.log(`[MULTER] File mimetype: ${file.mimetype}`);
  console.log(`[MULTER] File size: ${req.headers['content-length']} bytes`);

  // Check file type
  if (!allowedTypes.includes(file.mimetype)) {
    console.error(`[MULTER] Invalid file type: ${file.mimetype}`);
    return cb(new Error('Invalid file type. Only JPEG, PNG, JPG, and WebP are allowed.'), false);
  }

  // Check file size (using content-length header)
  const fileSize = parseInt(req.headers['content-length']);
  if (fileSize > maxSize) {
    console.error(`[MULTER] File too large: ${fileSize} bytes`);
    return cb(new Error('File too large. Maximum size is 5MB.'), false);
  }

  cb(null, true);
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Middleware to handle multiple fields
const vendorProfileUpload = (req, res, next) => {
    upload.fields([
      { name: 'profileImage', maxCount: 1 },
      { name: 'coverImage', maxCount: 1 }
    ])(req, res, (err) => {
      if (err) {
        console.error('[MULTER] Error during file upload:', err);
        return res.status(400).json({ success: false, message: err.message });
      }
      console.log('[MULTER] Middleware processed request:', {
        body: req.body,
        files: req.files,
      });
      next();
    });
  };
  

module.exports = {
  vendorProfileUpload,
  uploadDir
};