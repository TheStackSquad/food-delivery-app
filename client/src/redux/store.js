// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './reducers/layoutReducer';
import authReducer from './reducers/authReducer';

// Combine reducers
const rootReducer = {
  layout: layoutReducer,
  auth: authReducer,
};

// Create store with configureStore
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});

export default store;
