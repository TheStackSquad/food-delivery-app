//backend/utils/tokenManager.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = (token, secret) => {
  console.log("Validating token...");
  try {
    const decoded = jwt.verify(token, secret);
    console.log("Token is valid. Decoded payload:", decoded);

    console.log("Token to validate:", token);
    console.log("JWT Secret:", process.env.JWT_SECRET);

    return decoded;
  } catch (error) {
    console.error("Token validation failed:", error.message);
    return null;
  }
};

const refreshAccessToken = (refreshToken) => {
  console.log('[tokenManager] Validating refresh token:', refreshToken);

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
  //  console.log('[tokenManager] Refresh token valid. Decoded payload:', decoded);

    const newTokens = {
      accessToken: jwt.sign(
        { userId: decoded.userId, username: decoded.username },
        process.env.JWT_SECRET,
        { expiresIn: '45m' }
      ),
      refreshToken: jwt.sign(
        { userId: decoded.userId, username: decoded.username },
        process.env.REFRESH_SECRET,
        { expiresIn: '7d' }
      ),
    };

    //console.log('[tokenManager] New tokens generated:', newTokens);
    return newTokens;
  } catch (error) {
  //  console.error('[tokenManager] Failed to refresh token:', error.message);
    return null;
  }
};


module.exports = {
  validateToken,
  refreshAccessToken,
};
