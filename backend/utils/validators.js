//backend/utils/validators.js
const validator = require('validator');

const userValidators = {
  validateFullname: (fullname) => {
    const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
    if (!fullname || fullname.trim().length < 2) {
      return { isValid: false, error: 'Fullname must be at least 2 characters long.' };
    }
    if (!nameRegex.test(fullname)) {
      return { isValid: false, error: 'Fullname can only contain letters and spaces.' };
    }
    return { isValid: true };
  },

  validateUsername: (username) => {
    if (!username || typeof username !== 'string') {
      return { isValid: false, error: 'Username is required' };
    }
    if (username.length < 3 || username.length > 30) {
      return { isValid: false, error: 'Username must be between 3 and 30 characters' };
    }
    // Allow only alphanumeric characters and underscores
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return { isValid: false, error: 'Username can only contain letters, numbers, and underscores' };
    }
    return { isValid: true };
  },

  validateEmail: (email) => {
    if (!email) {
      return { isValid: false, error: 'Email is required' };
    }
    if (!validator.isEmail(email)) {
      return { isValid: false, error: 'Invalid email format' };
    }
    return { isValid: true };
  },

  validatePhone: (phone) => {
    if (!phone) {
      return { isValid: false, error: 'Phone number is required' };
    }
    if (!/^\d{10}$/.test(phone)) {
      return { isValid: false, error: 'Phone number must be 10 digits' };
    }
    return { isValid: true };
  },

  validatePassword: (password, confirmPassword) => {
    if (!password) {
      return { isValid: false, error: 'Password is required' };
    }
    if (password.length < 8) {
      return { isValid: false, error: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one number' };
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one special character (!@#$%^&*)' };
    }
    if (confirmPassword && password !== confirmPassword) {
      return { isValid: false, error: 'Passwords do not match' };
    }
    return { isValid: true };
  }
};

module.exports = userValidators;

