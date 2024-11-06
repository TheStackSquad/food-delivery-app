// backend/controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');
const userValidators = require('../utils/validators');

const signup = async (req, res) => {
  console.log('Received sign-up request:', req.body);
  
  try {
    const { username, email, phone, address, city, deliveryTime, password, confirmPassword } = req.body;

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
      deliveryTime,
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

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Fetch user from the database
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      // Fetch user's address and log it to the terminal (optional)
      // const address = await Address.findOne({ userId: user._id });
      // console.log('User Address:', address);
      res.status(200).json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { login, signup };