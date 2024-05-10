import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Get Users
    getUsersStart: (state) => {
      state.isLoading = true;
    },
    getUsersSuccess: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      state.users = actions.payload.map((user) => user);
    },
    getUsersFailure: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },

    // Delete Users
    deleteUserStart: (state) => {
      state.isLoading = true;
    },
    deleteUserSuccess: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      state.users.filter((user) => user._id === actions.payload);
    },
    deleteUserFailure: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
