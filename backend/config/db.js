//backend/config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI , {
            serverSelectionTimeoutMS: 20000, // Increase timeout to 20 seconds
            socketTimeoutMS: 45000,         // Increase socket timeout
            family: 4                       // Use IPv4, skip trying IPv6
          });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;


