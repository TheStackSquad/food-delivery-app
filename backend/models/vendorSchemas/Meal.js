//backend/models/vendorSchemas/Meal.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const MealSchema = new Schema({
  mealName: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // URL of the meal image
  price: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value > 0,
      message: 'Price must be a positive number',
    },
    set: (value) => Number(value), // Automatically convert to number
  },
  
  priceDescription: { type: String },
  pack: { type: String },
  inStock: { type: Boolean, default: true },
});

module.exports = mongoose.model('Meal', MealSchema);
