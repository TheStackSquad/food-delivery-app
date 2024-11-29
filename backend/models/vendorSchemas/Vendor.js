//backend/models/vendorSchemas/Vendor.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const VendorSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'Fullname is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: 'Invalid email format',
    },
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: 'Phone number must be 10 digits',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  vendorProfile: { type: Schema.Types.ObjectId, ref: 'VendorProfile' }, // Reference to VendorProfile
}, {
  timestamps: true,
});

VendorSchema.index({ email: 1, phone: 1 });

module.exports = mongoose.model('Vendor', VendorSchema);
