import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
  isLoggedIn: false,
  user: null,
  errorMessage: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.errorMessage = '';
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.errorMessage = '';
      localStorage.setItem('user', JSON.stringify(action.payload)); // Store user data in localStorage
    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.errorMessage = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.errorMessage = '';
      localStorage.removeItem('user'); // Remove user data from localStorage on logout
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;  // Set isLoggedIn to true when user is set
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, setUser } = loginSlice.actions;
export default loginSlice.reducer;
