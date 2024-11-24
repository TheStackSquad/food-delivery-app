const mongoose = require('mongoose');
const validator = require("validator");
const { Schema } = mongoose;

const VendorSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'Fullname is required'],
    trim: true,
    minlength: [3, 'Fullname must be at least 3 characters long'],
    maxlength: [30, 'Fullname cannot exceed 30 characters'],
    match: [/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces'],
    validate: {
      validator: function(v) {
        return v && v.trim().length > 0;
      },
      message: 'Fullname cannot be empty or just whitespace'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [
      {
        validator: validator.isEmail,
        message: 'Invalid email format'
      },
      {
        validator: function(v) {
          return v && v.length <= 254; // Maximum email length standard
        },
        message: 'Email is too long'
      }
    ]
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: 'Phone number must be 10 digits'
    },
    index: true // Add index for phone queries
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    validate: {
      validator: function(v) {
        return v && v.length >= 8;
      },
      message: 'Password must be at least 8 characters long'
    }
  }
}, {
  timestamps: true,
  collection: 'vendors' // Explicitly set collection name
});

// Pre-save middleware for hashing passwords
VendorSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Static method to find a vendor by email or phone
VendorSchema.statics.findByEmailOrPhone = async function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

const Vendor = mongoose.model('Vendor', VendorSchema);

module.exports = Vendor;