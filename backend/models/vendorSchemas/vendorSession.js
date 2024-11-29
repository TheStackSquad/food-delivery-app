// backend/models/vendorSchemas/vendorSession.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Vendor Session Schema to centralize references to vendor-related data
const vendorSessionSchema = new Schema({
  vendor: { 
    type: Schema.Types.ObjectId, 
    ref: 'Vendor', // Reference to the Vendor schema
    required: true 
  },

  // References to other schemas
  payout: [{
    type: Schema.Types.ObjectId, 
    ref: 'Payout'  // Reference to the Payout schema
  }],
  
  reviews: [{
    type: Schema.Types.ObjectId, 
    ref: 'Review'  // Reference to the Review schema
  }],
  
  // Vendor session details
  sessionData: {
    sessionStart: { type: Date, default: Date.now },
    sessionEnd: { type: Date },
    status: { type: String, default: 'active' }, // status of the session
  },

  // Operational tracking fields
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create the VendorSession model
const VendorSession = mongoose.model('VendorSession', vendorSessionSchema);

module.exports = VendorSession;
