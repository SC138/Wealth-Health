import React from "react";
import logo from "../../assets/img/logo.png";
// import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <section>
        <img src={logo} alt="Logo wealth health" className="logo-wh" />
        <h1>HRnet</h1>
      </section>
      <nav aria-label="navbar navigation" className="navbar">
        {/* <Link to="/" className="navlink"/> */}
      </nav>
    </header>
  );
};

export default Header;
