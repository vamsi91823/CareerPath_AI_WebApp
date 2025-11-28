// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CareerPaths from "./components/CareerPaths";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home / Landing page */}
        <Route path="/" element={<CareerPaths />} />

        {/* Sign In page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Sign Up page */}
        <Route path="/signup" element={<SignupPage />} />

        {/* Profile wizard (after sign up) */}
        <Route path="/profile" element={<Profile />} />
        {/* Dashboard overview */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
