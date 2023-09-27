import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'

import Home from './pages/home.jsx'

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
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);