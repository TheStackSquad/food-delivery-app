// backend/app.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const morgan = require('morgan');  // Morgan for HTTP logging
const socketHandler = require('./socket/socketHandler');
const connectDB = require('./config/db');
const routes = require('./routes');

const app = express();
const server = http.createServer(app);

app.use(morgan('dev'));  // Logs HTTP requests
app.use('/', routes);  // Apply your routes

// Database Connection
connectDB();  // Logs database connection status

// Initialize Socket.IO
const io = require('socket.io')(server, {
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] }
});
socketHandler(io);

module.exports = { app, server };
