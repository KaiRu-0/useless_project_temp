import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import "./nav.scss";
import Nav2 from "./Nav2";

const Layout2 = () => {
  return (
    <div>
      <Outlet />
      {/* <Nav2  /> */}
    </div>
  );
};

export default Layout2;
