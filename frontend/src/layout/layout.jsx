import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import "./nav.scss";

const Layout = () => {
  return (
    <div>
      <Outlet />
      <Nav />
    </div>
  );
};

export default Layout;
