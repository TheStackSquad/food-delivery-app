//backend/middleware/authMiddleware.js
const { validateToken } = require('../utils/tokenManager');

/**
 * Middleware to protect routes and validate the JWT token.
 */
const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.error('Access Denied: No token provided');
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  console.log('Validating token...');
  const decoded = validateToken(token, process.env.JWT_SECRET);

  if (!decoded) {
    console.error('Token validation failed.');
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }

  // Attach the decoded token payload to the request object
  req.user = {
    userId: decoded.userId, // Consistent key
    username: decoded.username,
    role: decoded.role
  };

  console.log('Token validated successfully. User:', req.user);
  next(); // Pass control to the next middleware or route handler
};

module.exports = authMiddleware;
