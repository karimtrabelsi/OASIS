import React from "react";
import Nav from "../layouts/nav";
import Footer from "../layouts/Footer";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../utils/zustand";

const Client = () => {
  const { user } = useAuthStore();
  const auth = localStorage.getItem("connectedUser");
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div id="main-wrapper" className="show">
      <Nav />
      <div className="content-body">
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Client;
