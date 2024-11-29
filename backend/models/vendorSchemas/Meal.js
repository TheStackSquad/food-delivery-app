const mongoose = require('mongoose');
const { Schema } = mongoose;

const MealSchema = new Schema({
  mealName: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // URL of the meal image
  price: { type: Number, required: true, min: 0 }, // Price cannot be negative
  priceDescription: { type: String },
  pack: { type: String },
  inStock: { type: Boolean, default: true },
});

module.exports = mongoose.model('Meal', MealSchema);
