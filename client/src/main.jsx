import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AuthService from "./utils/auth";

import Home from "./pages/home.jsx";
import Announcements from "./pages/announcements.jsx";
import Employees from "./pages/employees.jsx";
import Jobs from "./pages/jobs.jsx";
import Login from "./pages/login.jsx";

const RootComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!AuthService.loggedIn() && location.pathname !== "/login") {
      // Redirect to login page if not logged in and not already on the login page
      navigate("/login");
    } else if (AuthService.loggedIn() && location.pathname === "/login") {
      // Redirect to home page if logged in and on the login page
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <RootComponent />
  </Router>
);
