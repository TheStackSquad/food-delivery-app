//backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to protect routes and validate the JWT token
const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.error('Access Denied: No token provided');
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    // Verify the token
    console.log('Verifying token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token payload to the request object
    req.user = decoded;

    console.log('Token verified, user data:', decoded);
    
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error('Invalid or expired token:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;

