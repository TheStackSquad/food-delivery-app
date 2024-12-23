//backend/utils/generateToken.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateTokens = (payload) => {
  console.log('Generating tokens for payload:', payload);

  try {
    // Generate the access token
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h', // Adjust based on your app's needs
    });
    console.log('Access token generated successfully.');

    // Generate the refresh token
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: '7d',
    });
    console.log('Refresh token generated successfully.');

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Error generating tokens:', error);
    throw new Error('Failed to generate tokens.');
  }
};

module.exports = generateTokens;