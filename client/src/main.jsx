import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";

import Home from "./pages/home.jsx";
import Announcements from "./pages/announcements.jsx";
import Employees from "./pages/employees.jsx";
import Jobs from "./pages/jobs.jsx";
import Login from "./pages/login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Oops! This page does not exist.</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/announcements",
        element: <Announcements />,
      },
      {
        path: "/employees",
        element: <Employees />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
