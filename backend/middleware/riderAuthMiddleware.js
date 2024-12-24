// vendorAuthMiddleware.js
const { validateToken } = require('../utils/tokenManager');

const riderAuthMiddleware = (req, res, next) => {
// Get the token from the Authorization header
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];

console.log('Token extracted:', token);


  if (!token) {
    return res.status(403).json({ message: 'No rider token provided.' });
  }

  try {
    const decoded = validateToken(token, process.env.JWT_SECRET);
    console.log('Decoded token payload:', decoded);


    // Check if it's a vendor request
    if (decoded.riderId) {
      req.rider = {
        riderId: decoded.riderId, // Vendor ID from the token
        email: decoded.email,
        role: decoded.role
      };
      console.log('Rider Token validated successfully. rider:', req.vendor);
      console.log('Rider Id validated successfully. rider:', req?.vendor?.vendorId);
      next();
    } else {
      return res.status(401).json({ message: 'Invalid vendor token.' });
    }
  } catch (error) {
    console.error('Vendor token validation failed:', error);
    return res.status(401).json({ message: 'Invalid or expired vendor token.' });
  }
};

module.exports = riderAuthMiddleware;
