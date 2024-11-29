//backend/models/vendorSchema/Payout.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const PayoutSchema = new Schema({
  amount: { type: Number, required: true, min: 0 }, // Amount cannot be negative
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' }, // Status of the payout
});

const Payout = mongoose.model('Payout', PayoutSchema);
module.exports = Payout;
