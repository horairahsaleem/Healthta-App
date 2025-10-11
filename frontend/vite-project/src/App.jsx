// src/App.jsx
import React, { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";

import SignUp from "./components/auth/signup";
import Login from "./components/auth/login.jsx";
import HomePage from "./components/dashboard/homepage";
import Dashboard from "./components/dashboard/dashboard.jsx";
import { loadUser } from "./redux/actions/userActions.js";
import OnboardingPage from './components/onboarding/onBoarding.jsx'

/**
 * AppToasts: small helper inside App that shows ONE toast at a time.
 * - Shows error (unless ignored) OR success.
 * - Clears the shown value in Redux after showing so StrictMode double-render won't duplicate toasts.
 */
function AppToasts() {
  const dispatch = useDispatch();
  const toast = useToast();

  const { message, error } = useSelector((state) => state.user || {});

  // ignore these expected/unactionable errors
  const IGNORED_ERRORS = new Set([
    "Not authorized to access this route",
    "Login first",
    "Network Error",
  ]);

  // remember last shown values to avoid duplicate toasts (React StrictMode)
  const shownRef = useRef({ message: null, error: null });

  useEffect(() => {
    // If there's an error
    if (error) {
      // If error is in ignored list -> just clear it silently
      if (IGNORED_ERRORS.has(error)) {
        dispatch({ type: "clearError" });
        shownRef.current.error = null;
        return;
      }

      // Show error only once
      if (error !== shownRef.current.error) {
        toast({
          title: "Oops!",
          description: error,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
          variant: "left-accent",
        });
        shownRef.current.error = error;
        dispatch({ type: "clearError" }); // clear after showing
      }
      return; // do not show success if error exists
    }

    // If there's a success message and no error, show success
    if (message && !error) {
      if (message !== shownRef.current.message) {
        toast({
          title: "Success!",
          description: message,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
          variant: "left-accent",
        });
        shownRef.current.message = message;
        dispatch({ type: "clearMessage" }); // clear after showing
      }
    }
  }, [message, error, toast, dispatch]);

  return null;
}

function App() {
  const dispatch = useDispatch();

  // Load user on app start only if token cookie exists
  useEffect(() => {
    const token = document.cookie.split("; ").find((row) => row.startsWith("token="));
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <>
      <AppToasts />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboarding" element={<OnboardingPage/>} />
      </Routes>
    </>
  );
}

export default App;
