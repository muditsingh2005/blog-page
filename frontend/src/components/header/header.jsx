import React from "react";
import logo from "../../assets/blogger.png";
import "./header.css";

function Header() {
  return (
    <>
      <div className="header-container">
        <div className="logo-container">
          <img src={logo} alt="" className="logo" />
        </div>
        <div className="Nav-components">
          <ul>
            <li>Home</li>
            <li>My Profile</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
