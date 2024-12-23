 //backend/models/vendorSchemas/Profile.js
 const mongoose = require('mongoose');
 const { Schema } = mongoose;
 
 // Define the VendorProfile schema
 const VendorProfileSchema = new Schema({
   vendor: { 
     type: mongoose.Schema.Types.ObjectId, 
     unique: true, 
     ref: 'Vendor', 
     required: [true, 'Vendor reference is required'] 
   },
   storeName: {
     type: String,
     required: [true, 'Store name is required'],
     trim: true,
     minlength: [3, 'Store name must be at least 3 characters long'],
     validate: {
       validator: (v) => /^[a-zA-Z0-9\s&'-]+$/.test(v),
       message: 'Store name can only contain letters, numbers, spaces, &, \', and -',
     },
   },
   storeDescription: { type: String },
   coverImagePath: { type: String, default: '' },
   profileImagePath: { type: String, default: '' },
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
       validator: (v) => /^\d{10}$/.test(v),
       message: 'Phone number must be 10 digits',
     },
   },
   address: { type: String },
 });
 
 // Export the model
 module.exports = mongoose.model('VendorProfile', VendorProfileSchema);
 
 