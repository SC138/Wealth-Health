import React from "react";
import logo from "../../assets/img/logo.png";

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Logo wealth health" className="logo-wh" />
      <h1>HRnet</h1>
    </header>
  );
};

export default Header;
