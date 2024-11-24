// backend/controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const userValidators = require('../utils/validators');

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

// Login endpoint to authenticate users
const login = async (req, res) => {
  console.log('Login controller hit');
  
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    console.log('Login data received:', username);

    // Fetch user from the database
    const user = await User.findOne({ username });

    if (!user) {
      console.error(`User not found for username: ${username}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Compare provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.error(`Invalid password for username: ${username}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    console.log(`Password match for username: ${username}`);

    // Generate JWT token for the authenticated user
    const token = jwt.sign(
      { 
        userId: user._id, 
        username: user.username 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log(`Token generated successfully for ${username}`);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        profilePic: user.profilePic,
      },
    });

  } catch (error) {
    console.error('Error during login:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get profile after successful login (protected route)
const getProfile = async (req, res) => {
  try {
    // `req.user` contains the decoded token info (e.g., userId)
    console.log('Fetching user profile for user ID:', req.user.userId);

    // Fetch user from the database excluding the password
    const user = await User.findById(req.user.userId).select('-password'); // Exclude password for security

    if (!user) {
      console.error('User not found for user ID:', req.user.userId);
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the user profile data
    res.status(200).json({ user });
  } catch (error) {
    console.error('Failed to retrieve profile:', error);
    res.status(500).json({ message: 'Failed to retrieve profile' });
  }
};

module.exports = { getProfile, signup, login };
