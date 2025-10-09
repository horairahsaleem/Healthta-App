import axios from "axios";
import { server } from "../store/store.js"; // adjust if your server URL is elsewhere

// Contact Action
export const contact = (name, email, message) => async (dispatch) => {
  try {
    dispatch({ type: "contactRequest" });

    const { data } = await axios.post(
      `${server}/contact`,
      { name, email, message },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "contactSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "contactFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};
