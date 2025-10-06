import { createReducer } from "@reduxjs/toolkit";

const userInitialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  message: null,
  error: null,
  success:false
};

export const userReducer = createReducer(userInitialState, (builder) => {
  builder
   

    // REGISTER
   .addCase("registerRequest", (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.success = false;
    })
    .addCase("registerSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false; // signup doesn't auto-login
      state.message = action.payload?.message || "Signed up successfully";
      state.success = true;
      state.error = null;
    })
    .addCase("registerFail", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.success = false;
    })

    // VERIFY EMAIL
    .addCase("verifyRequest", (state) => { state.loading = true; })
    .addCase("verifySuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload; // "Email verified"
    })
    .addCase("verifyFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase("loginRequest", (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    })
    // CHANGED: backend sends { success, message, data: { user, token } }
    .addCase("loginSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload?.data?.user || null; // CHANGED: match backend shape
      state.message = action.payload?.message || null;
      state.error = null;
    })
    .addCase("loginFail", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload || "Login failed";
    })

    // loadUser flows
    .addCase("loadUserRequest", (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("loadUserSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload?.data?.user || action.payload?.user || null; // safe read
    })
    .addCase("loadUserFail", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload || null;
    })


    // LOGOUT
    .addCase("logoutRequest", (state) => { state.loading = true; })
    .addCase("logoutSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload;
    })
    .addCase("logoutFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // CLEAR
    .addCase("clearError", (state) => { state.error = null; })
    .addCase("clearMessage", (state) => { state.message = null; });
});
