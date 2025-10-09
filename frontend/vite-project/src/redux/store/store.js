import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../reducers/userReducer";
import { otherReducer } from "../reducers/otherReducer.js";


// ✅ your backend URL
export const server = "http://localhost:4000/api/v1";

const store = configureStore({
  reducer: {
    user: userReducer,
    other: otherReducer, // ✅ add here

  },
});

export default store;
