import { useState } from "react";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MovieList from "./pages/MovieList";
import WatchLater from "./pages/WatchLater";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { Toaster } from "react-hot-toast";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <MovieList />,
        },
        {
          path: "/watchlater",
          element: <WatchLater />,
        },
      ],
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/forgotPassword",
      element: <ForgotPassword />,
    },
    {
      path: "/resetPassword",
      element: <ResetPassword />,
    },
  ]);

  return (
    <div className="h-screen">
      <div>
        <Toaster />
      </div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
