// backend/controller/riderController.js
const Rider = require('../models/riderSchema/Rider');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userValidators = require('../utils/validators');

// Rider Signup Controller
const riderSignup = async (req, res) => {
  console.log('Received sign-up request:', req.body);
  try {
    const { fullName, email, phone, password, confirmPassword } = req.body; //is this supposed to be fullName or fullname

    // Check for existing user
    const existingUser = await Rider.findByEmailOrPhone(email, phone);
    if (existingUser) {
      return res.status(400).json({ 
        error: existingUser.user.email === email 
          ? "Email already registered" 
          : "Phone number already in use" 
      });
    }

    // Validate inputs
    const validations = [
      userValidators.validateFullname(fullName), //look into this as well, so there wnt be a mismatch of expected data
      userValidators.validateEmail(email),
      userValidators.validatePhone(phone),
      userValidators.validatePassword(password, confirmPassword)
    ];

    // Check for validation errors
    const validationError = validations.find(v => !v.isValid);
    if (validationError) {
      return res.status(400).json({ error: validationError.error });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new rider instance
    const newRider = new Rider({
      user: {
        fullName,
        email,
        phone,
        password: hashedPassword,
      },
    });

    // Save rider to the database
    await newRider.save();

    // Log success but don't include sensitive data
    console.log('User created successfully:', {
      username: newRider.user.fullName,
      email: newRider.user.email,
      createdAt: newRider.createdAt
    });

    // Send response
    res.status(201).json({
      message: "Rider signup successful",
      riderId: newRider._id,
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Rider Login Controller
const riderLogin = async (req, res) => {
  console.log("Login endpoint hit with data:", req.body);

  const { email, password } = req.body;
  try {
    // Query for the rider using the correct path for email
    const rider = await Rider.findOne({ 'user.email': email });
    if (!rider) {
      console.log("Rider not found for email:", email);
      return res.status(404).json({ message: 'Rider not found' });
    }

    console.log("Queried rider:", rider);

    // Check password existence
    if (!rider.user.password || !password) {
      console.log("Password missing. Rider password:", rider.user.password, "Request password:", password);
      return res.status(400).json({ message: 'Password is missing' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, rider.user.password);
    console.log("Password validation result:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Invalid password for email:", email);
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: rider._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log("Login successful for rider:", rider.user.fullName);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Rider Profile Update Controller
const updateRiderProfile = async (req, res) => {
  try {
    const { riderId, fullName, address, phone, age, deliveryMode } = req.body;

    const rider = await Rider.findById(riderId);
    if (!rider) {
      return res.status(404).json({ message: "Rider not found" });
    }

    rider.profile = { fullName, address, phone, age, deliveryMode };

    await rider.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Rider Payout Update Controller
const updateRiderPayout = async (req, res) => {
  try {
    const { riderId, earnings, deliveries, tips, completionRate, totalReviews } = req.body;

    const rider = await Rider.findById(riderId);
    if (!rider) {
      return res.status(404).json({ message: "Rider not found" });
    }

    rider.payout = {
      earnings,
      deliveries,
      tips,
      performanceRating: { completionRate, totalReviews }
    };

    await rider.save();
    res.status(200).json({ message: "Payout updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Rider Achievements Update Controller
const updateRiderAchievements = async (req, res) => {
  try {
    const { riderId, topRated, speedKing } = req.body;

    const rider = await Rider.findById(riderId);
    if (!rider) {
      return res.status(404).json({ message: "Rider not found" });
    }

    rider.achievements = { topRated, speedKing };

    await rider.save();
    res.status(200).json({ message: "Achievements updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  riderSignup,
  riderLogin,
  updateRiderProfile,
  updateRiderPayout,
  updateRiderAchievements,
};
