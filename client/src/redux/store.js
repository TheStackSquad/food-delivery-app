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

// Persist configuration for vendorReducer
const vendorPersistConfig = {
  key: 'vendor',
  storage, // e.g., localStorage or AsyncStorage for React Native
  whitelist: ['isAuthenticated', 'vendorData'], // Persist vendorData as a single object
};



const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedVendorReducer = persistReducer(vendorPersistConfig, vendorReducer);

// Logger setup
const logger = createLogger({
  collapsed: true,
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
    vendor: persistedVendorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export default store;
