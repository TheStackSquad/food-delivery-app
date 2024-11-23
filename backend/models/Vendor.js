// backend/models/Vendor.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const MealSchema = new Schema({
  mealName: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // URL of the meal image
  price: { type: Number, required: true },
  priceDescription: { type: String },
  pack: { type: String },
  inStock: { type: Boolean, default: true },
});

const PayoutSchema = new Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' }, // Status of the payout
});

const ReviewSchema = new Schema({
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
});

const VendorSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'Username is required'],
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
  // commented out till we figure out how to merge  
  /*storeName: { type: String, required: [true, 'Store name is required'] },
  storeDescription: { type: String },
  coverImage: { type: String }, // URL for the cover image
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
  menu: [MealSchema], // Array of meals offered by the vendor
  payouts: [PayoutSchema], // Array of payouts
  totalOrders: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  averageOrderAmount: { type: Number, default: 0 },
  reviews: [ReviewSchema], // Array of reviews from customers */
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create index for faster queries based on email or phone
VendorSchema.index({ email: 1, phone: 1 });

module.exports = mongoose.model('Vendor', VendorSchema);
