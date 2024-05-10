import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  category: localStorage.getItem('category') ? JSON.parse(localStorage.getItem('category')) : '',
  searchParams: '',
  isLoading: false,
  error: null,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    // Get ALl Items
    getItemStart: (state) => {
      state.isLoading = true;
    },
    getItemSuccess: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      state.items = actions.payload.map((item) => ({
        ...item,
      }));
    },
    getItemFailure: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },

    // Get users item
    getUsersItemStart: (state) => {
      state.isLoading = true;
    },
    getUsersItemSuccess: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      state.items = actions.payload.map((item) => item);
    },
    getUsersItemFailure: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },

    // category
    setCategoryType: (state, actions) => {
      state.category = actions.payload;
      localStorage.setItem('category', JSON.stringify(actions.payload))
    },

    // Search Params
    handleSearchParams: (state, actions) => {
      state.searchParams = actions.payload;
    }
  },
});

export const {
  getItemStart,
  getItemSuccess,
  getItemFailure,
  getUsersItemStart,
  getUsersItemSuccess,
  getUsersItemFailure,
  setCategoryType,
  handleSearchParams
} = itemSlice.actions;

export default itemSlice.reducer;
