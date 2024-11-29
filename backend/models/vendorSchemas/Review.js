const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', ReviewSchema);
