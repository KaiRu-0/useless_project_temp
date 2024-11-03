import React from "react";

const Nav2 = () => {
  return (
    <div className="side-bar">
      <label className="switch">
        <input type="checkbox" />
        <span className="wrapper">
          <span className="row">
            <span className="dot"></span>
            <span className="dot"></span>
          </span>
          <span className="row row-bottom">
            <span className="dot"></span>
            <span className="dot"></span>
          </span>
          <span className="row-vertical">
            <span className="dot"></span>
            <span className="dot middle-dot"></span>
            <span className="dot"></span>
          </span>
          <span className="row-horizontal">
            <span className="dot"></span>
            <span className="dot middle-dot-horizontal"></span>
            <span className="dot"></span>
          </span>
        </span>
      </label>
      <div className="content">
        <nav>
          <ul>
            <h2>Navigation</h2>
            <li><a href="">Assignment</a></li>
            <li><a href="">Assignment</a></li>
            <li><a href="">Assignment</a></li>
            <li><a href="">Assignment</a></li>
            <li><a href="">Assignment</a></li>
            <li><a href="">Assignment</a></li>
            <li><a href="">Assignment</a></li>

          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Nav2;
