// backend/controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/userSchema/User');
const Meal = require('../models/vendorSchemas/Meal');
const jwt = require('jsonwebtoken');
const { refreshAccessToken } = require('../utils/tokenManager');
const generateTokens = require('../utils/generateToken');
const userValidators = require('../utils/validators');
const fs = require('fs').promises;
const path = require('path');


// Sign-up endpoint to create a new user
const signup = async (req, res) => {
  console.log('Received sign-up request:', req.body);

  try {
    const {
      username, email, phone, address, city, password, confirmPassword
    } = req.body;

    // Validate all fields
    const validations = [
      userValidators.validateUsername(username),
      userValidators.validateEmail(email),
      userValidators.validatePhone(phone),
      userValidators.validatePassword(password, confirmPassword)
    ];
    validations.forEach((v, index) => {
      console.log(`Validation ${index + 1}:`, v);
    });
    
    // Check for validation errors
    const validationError = validations.find(v => !v.isValid);
    if (validationError) {
      console.error('Validation failed:', validationError.error);
      return res.status(400).json({ error: validationError.error });
    }

 // Check for existing username
 const existingUser = await User.findOne({ username });
 if (existingUser) {
   // Generate alternative username suggestions
   const suggestions = [
     `${username}_${Math.floor(Math.random() * 1000)}`,
     `${username}.${Math.floor(Math.random() * 1000)}`,
     `${username}${Math.floor(Math.random() * 1000)}`
   ];

   return res.status(400).json({
     error: 'Username already taken.',
     suggestions
   });
 }

 // Check for existing email (optional if unique)
 const existingEmail = await User.findOne({ email: email.toLowerCase() });
 if (existingEmail) {
   return res.status(400).json({ error: 'Email already in use.' });
 }

    // Hash password before saving to DB
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully.');

    // Create new user object
    const newUser = new User({
      username,
      email: email.toLowerCase(),
      phone,
      address,
      city,
      password: hashedPassword
    });

    // Save user to the database
    await newUser.save();
    console.log('User created successfully:', {
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt
    });

    // Respond with success and user details (excluding password)
    res.status(201).json({
      message: 'Sign-up successful!',
      user: {
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error('Error during sign-up:', error);
    res.status(500).json({
      error: 'Sign-up failed. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

//Login endpoint to validate user
const login = async (req, res) => {
  console.log('[Login] Controller hit');
  console.log('[Login] Request body:', req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    console.log('[Login] Missing username or password');
    return res.status(400).json({
      success: false,
      message: 'Username and password are required',
    });
  }

  try {
    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      console.log(`[Login] User not found: ${username}`);
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`[Login] Invalid password for user: ${username}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate tokens
    const payload = {
      userId: user._id,
      username: user.username,
      role: user.role, // Include role in the payload
    };

    const { accessToken, refreshToken } = generateTokens(payload);
    console.log('Access Token:', accessToken);
console.log('Access Token Payload:', jwt.decode(accessToken));
console.log('Refresh Token:', refreshToken);
console.log('Refresh Token Payload:', jwt.decode(refreshToken));


    // Respond with tokens and user data
    console.log(`[Login] Login successful for user: ${username}`);
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      accessToken, // Include accessToken here
      refreshToken, // Include refreshToken here
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        profilePic: user.profilePic || 'default-profile-pic.webp',
        role: user.role,
      },
    });
  } catch (error) {
    console.error('[Login] Server error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message,
    });
  }
};


// Utility function to delete a file
const deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
    console.log(`Deleted file: ${filePath}`);
  } catch (err) {
    console.warn(`Failed to delete file: ${filePath}, Error: ${err.message}`);
  }
};

// Upload Profile Image Controller
const uploadProfileImage = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileName = req.file.filename; // Extract the filename from the uploaded file
    console.log('Uploaded Filename:', fileName);

    // Find the user by ID from the token
    const user = await User.findById(req.user.userId);
    if (!user) {
      // Delete the uploaded file if the user isn't found
      await deleteFile(req.file.path);
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the old profile picture if it exists and isn't the default
    if (user.profilePic && user.profilePic !== 'default-profile-pic.webp') {
      const oldImagePath = path.join(__dirname, '../uploads/userProfile', user.profilePic);
      console.log("Old profile image path to delete:", oldImagePath);
      await deleteFile(oldImagePath);
    }

    // Update the user's profilePic field in the database
    user.profilePic = fileName;
    const updatedUser = await user.save(); // Save the updated user
    console.log('Updated User:', { id: updatedUser._id, profilePic: updatedUser.profilePic });

    // Send a success response
    res.status(200).json({
      message: 'Profile image uploaded successfully',
      filePath: fileName,
    });
  } catch (error) {
    console.error('Error uploading profile picture:', error);

    // Delete the uploaded file if an error occurs
    if (req.file) {
      await deleteFile(req.file.path);
    }

    res.status(500).json({
      message: 'Server error during image upload',
      error: error.message,
    });
  }
};


// Controller to handle GET /login/dashboard
const getProfile = async (req, res) => {
  try {
    // Log user ID for debugging
    console.log('Fetching user profile for user ID:', req.user.userId);

    // Find the user by ID, excluding sensitive fields like the password
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      console.error('User not found for user ID:', req.user.userId);
      return res.status(404).json({ message: 'User not found' });
    }

    // Log the fetched user data (excluding sensitive fields)
    console.log('User profile fetched:', {
      id: user._id,
      profilePic: user.profilePic,
    });

    // Respond with the user's profile data
    res.status(200).json({ user });
  } catch (error) {
    console.error('Failed to retrieve profile:', error);
    res.status(500).json({ message: 'Failed to retrieve profile' });
  }
};

// Fetch meals by category
const mealController = {
  // Get all meals or filter by category
  getMeals: async (req, res) => {
    console.log('meal controller hit...');
    try {
      const { category } = req.query;
      let query = {};
      
      // If category is specified and not 'all', add it to query
      if (category && category !== 'all') {
        query.category = category;
      }

      const meals = await Meal.find(query).sort({ createdAt: -1 });
      res.json(meals);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching meals', error: error.message });
    }
  },
};

// Refresh Token Controller
const refreshUserToken = (req, res) => {
  const { refreshToken } = req.body;

  // If no refresh token is provided
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required.' });
  }

  // Call refreshAccessToken to validate and get new tokens
  const newTokens = refreshAccessToken(refreshToken);

  // If the refresh token is invalid or expired
  if (!newTokens) {
    return res.status(403).json({ message: 'Invalid or expired refresh token.' });
  }

  // Send the new access and refresh tokens back to the frontend
  res.json(newTokens);
};

module.exports = {
  signup,
  login,
  uploadProfileImage,
  getProfile,
  mealController,
  refreshUserToken
};





