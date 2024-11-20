// backend/controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
//const Rider = require('../models/Rider');
const userValidators = require('../utils/validators');

const signup = async (req, res) => {
  console.log('Received sign-up request:', req.body);
  
  try {
    const { username, email, phone, address, city, password, confirmPassword } = req.body;

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
      return res.status(400).json({ error: validationError.error });
    }

    // Check for existing user
    try {
      await User.checkExisting(email, username);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email: email.toLowerCase(),
      phone,
      address,
      city,
      password: hashedPassword
    });

    // Save user
    await newUser.save();
    
    // Log success but don't include sensitive data
    console.log('User created successfully:', {
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt
    });

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

/*const riderSignup = async (req, res) => {
  console.log('Received sign-up request:', req.body);
  
  try {
    const { name: fullname, email, phone, password, confirmPassword } = req.body;

    // Validate all fields
    const validations = [
      userValidators.validateFullname(fullname),
      userValidators.validateEmail(email),
      userValidators.validatePhone(phone),
      userValidators.validatePassword(password, confirmPassword)
    ];

    // Log validation results for debugging
    validations.forEach((validation, index) => {
      console.log(`Validation ${index + 1}:`, validation);
    });

    // Check for validation errors
    const validationError = validations.find(v => !v.isValid);
    if (validationError) {
      console.log('Validation failed:', validationError);
      return res.status(400).json({ error: validationError.error });
    }

    // Check for existing user
    try {
      await User.checkExisting(email, fullname);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullname,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword
    });

    // Save user
    await newUser.save();
    
    // Log success but don't include sensitive data
    console.log('User created successfully:', {
      fullname: newUser.fullname,
      email: newUser.email,
      createdAt: newUser.createdAt
    });

    res.status(201).json({
      message: 'Sign-up successful!',
      user: {
        fullname: newUser.fullname,
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
};*/


const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Fetch user from the database
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET, // Ensure you have a strong JWT_SECRET in your environment variables
        { expiresIn: '1h' } // Token expires in 1 hour
      );

      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          username: user.username,
          email: user.email
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

// Get to profile after logging in
const getProfile = async (req, res) => {
  try {
    // `req.user` contains the decoded token info (e.g., userId)
    const user = await User.findById(req.user.userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve profile' });
  }
};

module.exports = { getProfile, signup, login};
