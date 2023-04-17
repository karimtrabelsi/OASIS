import React from "react";
import { Outlet } from "react-router-dom";
import NavF from "./navf";
import Footer from "./Footer";

const FrontLayout = () => {
  return (
    <>
      <NavF />
      <Outlet />
      <Footer />
    </>
  );
};

export default FrontLayout;
