import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../reducers/userReducer";

// ✅ your backend URL
export const server = "http://localhost:4000/api/v1";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
