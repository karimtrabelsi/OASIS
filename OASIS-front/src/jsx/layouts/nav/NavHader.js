import React, { useState } from "react";

/// React router dom
import { Link } from "react-router-dom";

/// images
import logo from "../../../images/logo.png";
import logoText from "../../../images/logo-text.png";

const NavHader = () => {
  const [toggle, setToggle] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  const handleButtonClick = () => {
    setShowLogo(!showLogo);
  };

  return (
    <div className="nav-header">
      <Link to="/client/home" className="brand-logo">
        <img className="logo-abbr" src={logo} alt="" />
        {/* <img className="logo-compact" src={logoText} alt="" /> */}
        {showLogo && <img className="brand-title" src={logoText} alt="" />}
      </Link>

      <div
        className="nav-control"
        onClick={() => {
          setToggle(!toggle);
          setShowLogo(!showLogo);
        }}
      >
        <div className={`hamburger ${toggle ? "is-active" : ""}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;
