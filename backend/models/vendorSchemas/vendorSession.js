// backend/models/vendorSchemas/vendorSession.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the VendorSession schema
const vendorSessionSchema = new Schema({
  vendor: { 
    type: Schema.Types.ObjectId, 
    ref: 'Vendor', // Reference to the Vendor schema
    required: true // Ensure a vendor is always associated
  },
  profile: { 
    type: Schema.Types.ObjectId, 
    ref: 'VendorProfile', // Reference to the Profile schema
    required: false // Optional to accommodate different states
  },  
  meals: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Meal', // Reference to the Meal schema
    required: false 
  }],
  payout: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Payout' 
  }],
  reviews: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Review' 
  }],
  sessionData: {
    sessionStart: { type: Date, default: Date.now }, // Auto-set session start
    sessionEnd: { type: Date }, // Optional session end
    status: { type: String, default: 'active' }, // Default status is 'active'
  },
  createdAt: { type: Date, default: Date.now }, // Auto-set creation time
  updatedAt: { type: Date, default: Date.now }, // Auto-set update time
});

// Index vendor and status for efficient queries
vendorSessionSchema.index({ vendor: 1 });
vendorSessionSchema.index({ status: 1 });

// Pre-save hook to ensure data consistency
vendorSessionSchema.pre('save', function (next) {
  if (!this.profile) {
    console.warn(`VendorSession for vendor ${this.vendor} is missing a profile reference.`);
  }
  this.updatedAt = new Date(); // Update timestamp automatically
  next();
});

// Export the model
module.exports = mongoose.model('VendorSession', vendorSessionSchema);

