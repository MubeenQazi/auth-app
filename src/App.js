import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

function ProtectedRoute() {
  const auth = JSON.parse(localStorage.getItem("USER_SESSION"));
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* This is the protected pipline */}
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/" element={<Home />} />
        </Route>

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
