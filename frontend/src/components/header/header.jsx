import React from "react";
import logo from "../../assets/blogger.png";
import "./header.css";

function Header() {
  return (
    <>
      <div className="header-container">
        <img src={logo} alt="" className="header-logo" />
      </div>
    </>
  );
}

export default Header;
