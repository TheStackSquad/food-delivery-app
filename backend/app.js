// backend/app.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const socketHandler = require('./socket/socketHandler');
const connectDB = require('./config/db');
const routes = require('./routes');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(morgan('dev'));
app.use('/', routes); 
// Middleware & Routes
app.use('/', routes);

// Database Connection
connectDB();
connectDB();

// Initialize Socket.IO
const io = require('socket.io')(server, {
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] }
});
socketHandler(io);

module.exports = { app, server };