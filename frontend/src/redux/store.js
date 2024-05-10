import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./features/authSlicer";
import itemSlice from "./features/itemSlice";
import userSlice from "./features/userSlice";

const store = configureStore({
  reducer: {
    auth: authSlicer,
    item: itemSlice,
    user: userSlice,
  },
});

export default store;
