import React, { useState } from "react";

/// React router dom
import { Link } from "react-router-dom";

/// images
import logo from "../../../images/logo.png";
import logoText from "../../../images/logo-text.png";

const NavHader = () => {
   const [toggle, setToggle] = useState(false);
   const [showLogo, setShowLogo] = useState([]);
   
   return (
       <nav className="navbar">
      <div className="nav-header">
         <Link to="/client/home" className="brand-logo" >
            <img className="logo-abbr" src={logo} alt=""/> 
            {/* <img className="logo-compact" src={logoText} alt="" /> */}
            {showLogo && <img className="brand-title" src={logoText} alt="" />}
         </Link>
      </div>
      <ul className={`nav-menu ${toggle ? "active" : ""}`}>
         <li className="nav-item">
            <Link to="/client/home" className="nav-link">Home</Link>
         </li>
      </ul>
   </nav>
   );
};

export default NavHader;
