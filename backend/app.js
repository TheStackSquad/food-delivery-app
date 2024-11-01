const express = require('express');
const http = require('http');
const socketHandler = require('./socket/socketHandler');
const connectDB = require('./config/db');
const routes = require('./routes');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Middleware & Routes
app.use('/', routes);

// Database Connection
connectDB();

// Initialize Socket.IO
const io = require('socket.io')(server, {
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] }
});
socketHandler(io);

module.exports = { app, server };