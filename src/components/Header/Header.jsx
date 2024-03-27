import React from "react";
import logo from "../../assets/img/logo.webp";

const Header = () => {
  return (
    <header>
      <section>
        <img
          src={logo}
          loading="lazy"
          alt="Logo wealth health"
          className="logo-wh"
        />
        <h1>HRnet</h1>
      </section>
    </header>
  );
};

export default Header;
