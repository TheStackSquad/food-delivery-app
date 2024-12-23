// backend/app.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const cors = require('cors');
const socketHandler = require('./socket/socketHandler');
const connectDB = require('./config/db');
const routes = require('./router/routes');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const server = http.createServer(app);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(morgan('common'));
app.use(express.json());
app.use(cookieParser());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routes
app.use('/api', routes);
app.get('/api/test', (req, res) => res.send('Proxy test working!'));
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Database Connection
connectDB();

// Initialize Socket.IO
const io = require('socket.io')(server, {
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] }
});
socketHandler(io);

module.exports = { app, server };