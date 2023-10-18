import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import SignupPage from "../pages/SignupPage";
import ConfirmationPage from "../pages/ConfirmationPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";

const AppRouter: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("user");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/confirmation-email"
          element={
            !isAuthenticated ? <ConfirmationPage /> : <Navigate to="/home" />
          }
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignupPage /> : <Navigate to="/home" />}
        />
        <Route
          path="*"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
