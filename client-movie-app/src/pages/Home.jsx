import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function Home() {
  return (
    <div>
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
}

export default Home;
