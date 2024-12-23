//backend/router/routes.js

const express = require('express');
const router = express.Router();
const debug = require('debug')('app:routes');

// Import route modules
const userRoutes = require('./userRoutes');
const vendorRoutes = require('./vendorRoutes');
const riderRoutes = require('./riderRoutes');

// Debug logging for incoming requests
router.use((req, res, next) => {
    debug(`Incoming ${req.method} request to: ${req.path}`);
    next();
  });

// Mount route modules
router.use('/user', userRoutes);
router.use('/vendor', vendorRoutes);
router.use('/rider', riderRoutes);

// Debug initialization
debug('Routes initialized.');

module.exports = router;