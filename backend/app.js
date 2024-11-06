// backend/app.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const cors = require('cors'); // Add cors import
const socketHandler = require('./socket/socketHandler');
const connectDB = require('./config/db');
const routes = require('./router/routes');

const app = express();
const server = http.createServer(app);

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(morgan('common'));
app.use(express.json());

// Mount routes
app.use('/api', routes); // Changed from '/' to '/api'

// Database Connection
connectDB();

// Initialize Socket.IO
const io = require('socket.io')(server, {
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] }
});
socketHandler(io);

module.exports = { app, server };