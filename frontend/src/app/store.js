import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    // Add more reducers here as your application grows
  },
});

export default store;
