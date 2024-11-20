//backend/models/Rider.js
const mongoose = require("mongoose");
const validator = require("validator");

// Rider Schema
const RiderSchema = new mongoose.Schema(
  {
    user: { // Wrapping the fields inside the 'user' object
      fullName: {
        type: String,
        required: [true, "Full name is required"], // Ensures fullName is always provided
        trim: true, // Removes leading/trailing spaces
        minlength: [2, "Full name must be at least 2 characters long"],
        maxlength: [50, "Full name cannot exceed 50 characters"],
        match: [/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"], // Validates format
      },
      email: {
        type: String,
        required: true, // Ensures email is mandatory
        unique: true, // Prevents duplicate email entries
        trim: true, // Removes unnecessary spaces
        lowercase: true, // Converts to lowercase for consistency
        validate: {
          validator: validator.isEmail, // Uses validator library to validate email
          message: "Invalid email format",
        },
      },
      phone: {
        type: String,
        required: [true, "Phone number is required"], // Ensures phone is provided
        validate: {
          validator: function (v) {
            return /^\d{10}$/.test(v); // Validates 10-digit phone number
          },
          message: "Phone number must be 10 digits",
        },
      },
      password: {
        type: String,
        required: [true, "Password is required"], // Password is mandatory
        minlength: [8, "Password must be at least 8 characters long"], // Enforces a strong password length
      },
    },

    // Profile info - optional fields for additional details
    address: { type: String }, // Optional field for user's address
    age: { type: Number, min: 18 }, // Ensures age is at least 18
    deliveryMode: {
      type: String,
      enum: ["Bike", "Car", "Bicycle"], // Limits values to predefined delivery modes
      default: "Bike",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Index for faster queries
RiderSchema.index({ "user.email": 1, "user.fullName": 1 });

// Pre-save middleware to handle additional processing or validation
RiderSchema.pre("save", function (next) {
  console.log(`[RiderSchema] Pre-save middleware triggered for ${this.user.email}`);
  next(); // Ensures the save process continues
});

// Static method to check if a user exists by email or phone
RiderSchema.statics.findByEmailOrPhone = async function (email, phone) {
  return await this.findOne({
    $or: [{ "user.email": email }, { "user.phone": phone }], // Allows finding by either email or phone
  });
};

module.exports = mongoose.model("Rider", RiderSchema);