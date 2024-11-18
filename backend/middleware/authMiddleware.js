const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded token payload to the request object
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
