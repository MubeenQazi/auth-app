import Login from './components/Login'
import SignUp from './components/SignUp';
import Home from './components/Home';

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";


const PrivateRoute = () => {
  const auth = JSON.parse(localStorage.getItem("USER_SESSION"));
  return auth && auth.token ? <Outlet /> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<PrivateRoute />}>
          <Route exact path='/' element={<Home />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}