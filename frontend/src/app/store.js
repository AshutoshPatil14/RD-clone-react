import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice.js';
import cartReducer from '../features/cartSlice.js';
import userReducer from '../features/userSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    user: userReducer,
    // Add more reducers here as your application grows
  },
});

export default store;