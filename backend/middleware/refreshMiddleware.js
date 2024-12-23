//backend/middleware/refreshMiddleware.js
const { refreshAccessToken } = require('../utils/tokenManager');

/**
 * Middleware to handle refreshing tokens.
 */
const refreshMiddleware = (req, res) => {
  const { refreshToken } = req.body; // Assume refresh token is sent in the body

  if (!refreshToken) {
    console.error('Refresh token not provided');
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  console.log('Attempting to refresh tokens...');
  const newTokens = refreshAccessToken(refreshToken);

  if (!newTokens) {
    console.error('Failed to refresh tokens');
    return res.status(403).json({ message: 'Invalid or expired refresh token.' });
  }

  console.log('Tokens refreshed successfully:', newTokens);
  return res.status(200).json(newTokens);
};

module.exports = refreshMiddleware;
