import axios from "axios";
import { server } from "../store/store.js";

// REGISTER (Signup)

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });

    const { data } = await axios.post(`${server}/register`, formData, {
      headers: { "Content-type": "application/json" },
      withCredentials: true,
    });

    console.log("REGISTER API RESPONSE:", data);   // <<-- debug log
    dispatch({ type: "registerSuccess", payload: data }); // send full data object
    return data;
  } catch (error) {
    console.log("REGISTER ERROR:", error.response?.data || error.message);
    dispatch({
      type: "registerFail",
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      { headers: { "Content-type": "application/json" }, withCredentials: true }
    );

    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "loginFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};


export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });
    const { data } = await axios.get(`${server}/me`, { withCredentials: true }); // CHANGED: endpoint path must match backend
    dispatch({ type: "loadUserSuccess", payload: data });
    return data;
  } catch (err) {
    const message = err?.response?.data?.message || err.message;
    dispatch({ type: "loadUserFail", payload: message });
    // do not throw here to avoid breaking caller unless you want to
    return null;
  }
};

// NEW: socialLogin - called by components (dispatch(socialLogin(provider, token, extraData)))
// It dispatches the SAME loginRequest/loginSuccess/loginFail types so reducer is reused.
export const socialLogin = (provider, providerToken = "", extraData = {}) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" }); // reuse same pattern as normal login

    const body = {
      provider,
      providerToken,
      ...extraData, // expects: socialId, email, firstName, lastName (your backend required fields)
    };

    const { data } = await axios.post(
      `${server}/social-login`, // CHANGED: ensure this is the exact route your backend uses
      body,
      { withCredentials: true } // IMPORTANT: allow backend to set httpOnly cookie
    );

    // dispatch full backend response as payload (reducer expects payload.data.user)
    dispatch({ type: "loginSuccess", payload: data });

    // populate redux user using cookie (backend set cookie)
    await dispatch(loadUser());

    return data;
  } catch (err) {
    const message = err?.response?.data?.message || err.message;
    dispatch({ type: "loginFail", payload: message });
    throw new Error(message);
  }
};

// LOGOUT
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });

    const { data } = await axios.get(`${server}/logout`, { withCredentials: true });

    dispatch({ type: "logoutSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};
