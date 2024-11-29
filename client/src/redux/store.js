// client/src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import authReducer from './reducers/authReducer';
import layoutReducer from './reducers/layoutReducer';
import vendorReducer from './reducers/vendorReducer';

// Persist configuration for authReducer
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'isAuthenticated'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Logger setup
const logger = createLogger({
  collapsed: true, // Collapse actions in the log for better readability
});

// Middleware array
const middleware = [];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

// Configure store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    layout: layoutReducer,
    vendor: vendorReducer, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Persistor setup
export const persistor = persistStore(store);
export default store;
