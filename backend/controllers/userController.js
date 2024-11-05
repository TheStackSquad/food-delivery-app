//backend/controllers/userControllers.js
const express = require('express');
const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/User');
const router = express.Router();

// POST /api/signup
router.post('/', async (req, res) => {
  console.log('Received sign-up request:', req.body); 
  try {
    const { username, email, phone, address, city, deliveryTime, password, confirmPassword } = req.body;

    // Validate phone number
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ error: 'Phone number must be 10 digits.' });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Validate password length and confirm match
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      phone,
      address,
      city,
      deliveryTime,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    console.log('User saved:', newUser);

    // Send response
    res.status(201).json({ message: 'Sign-up successful!' });
  } catch (error) {
    console.error('Error during sign-up:', error);
    res.status(500).json({ error: 'Sign-up failed. Please try again.' });
  }
});

module.exports = router;
