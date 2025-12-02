import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // This slice can be used to store additional user-specific data
  // that is not directly related to authentication, e.g., preferences, settings.
  // The main user object (firstName, email, etc.) is typically managed by authSlice.
  preferences: {
    theme: 'light',
    notifications: true,
  },
  // You can add more user-specific states here
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.preferences.theme = action.payload;
    },
    toggleNotifications: (state) => {
      state.preferences.notifications = !state.preferences.notifications;
    },
    // Add more reducers for other user-specific data
  },
});

export const { setTheme, toggleNotifications } = userSlice.actions;
export default userSlice.reducer;
