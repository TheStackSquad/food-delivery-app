 //backend/models/vendorSchemas/Profile.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const VendorProfileSchema = new Schema({
  storeName: {
    type: String,
    required: [true, 'Store name is required'],
    trim: true, // Automatically trims whitespace
    minlength: [3, 'Store name must be at least 3 characters long'],
    validate: {
      validator: function(v) {
        // Regex to allow letters, numbers, spaces, &, ', and -
        return /^[a-zA-Z0-9\s&'-]+$/.test(v);
      },
      message: 'Store name can only contain letters, numbers, spaces, &, \', and -'
    }
  },
  storeDescription: { type: String },
  coverImage: { type: String },
  vendorType: { type: String },
  officialEmail: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: 'Invalid email format',
    },
  },
  officialPhoneNumber: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: 'Phone number must be 10 digits',
    },
  },
  address: { type: String },
});

module.exports = mongoose.model('VendorProfile', VendorProfileSchema);
