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

import Announcements from "./pages/Announcements/announcements.jsx";
import Employees from "./pages/Employees/employees.jsx";
import Login from "./pages/Login/login.jsx";
import Dispatch from "./pages/Dispatch/dispatch.jsx";
import Home from "./pages/Home/home.jsx";
import Office from "./pages/Office/office.jsx";
import Contacts from "./pages/Contacts/contacts.jsx";
import Companies from "./pages/Companies/companies.jsx";

const RootComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!AuthService.loggedIn() && location.pathname !== "/login") {
      navigate("/login");
    } else if (AuthService.loggedIn() && location.pathname === "/login") {
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/office" element={<Office />} />
        <Route path="/dispatch" element={<Dispatch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/companies" element={<Companies />} />
      </Route>
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <RootComponent />
  </Router>
);
