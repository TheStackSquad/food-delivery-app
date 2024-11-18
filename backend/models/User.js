// backend/models/User.js
const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format'
    }
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: 'Phone number must be 10 digits'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  profilePic: {
    type: String,
    default: 'default-profile-pic.webp'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
UserSchema.index({ email: 1, username: 1 });

// Pre-save middleware to update lastUpdated
UserSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

// Static method to check if user exists
UserSchema.statics.checkExisting = async function(email, username) {
  const existingUser = await this.findOne({
    $or: [
      { email: email.toLowerCase() },
      { username: username }
    ]
  });

  if (existingUser) {
    if (existingUser.email === email.toLowerCase()) {
      throw new Error('Email already registered');
    }
    if (existingUser.username === username) {
      throw new Error('Username already taken');
    }
  }
  return false;
};

module.exports = mongoose.model('User', UserSchema);