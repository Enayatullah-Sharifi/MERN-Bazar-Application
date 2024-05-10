import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Register User
    registerStart: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      state.userInfo = actions.payload;
      localStorage.setItem("userInfo", JSON.stringify(actions.payload));
    },
    registerFailure: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },

    // Login User
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      state.userInfo = actions.payload;
      localStorage.setItem("userInfo", JSON.stringify(actions.payload));
    },
    loginFailure: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },

    // Logout User
    logoutStart: (state) => {
      state.isLoading = true;
    },
    logoutSuccess: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      localStorage.setItem("userInfo", null);
    },
    logoutFailure: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },

    // Update User
    updateUserStart: (state) => {
      state.isLoading = true;
    },
    updateUserSuccess: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      state.userInfo = actions.payload;
      localStorage.setItem("userInfo", JSON.stringify(actions.payload));
    },
    updateUserFailure: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} = authSlice.actions;
export default authSlice.reducer;
