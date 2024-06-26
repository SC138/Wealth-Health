import React from "react";
import logo from "../../assets/img/logo.webp";

const Header = () => {
  // Fonction pour rafraîchir la page
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <header>
      <section>
        <img
          src={logo}
          loading="lazy"
          alt="Logo wealth health"
          className="logo-wh"
          onClick={refreshPage}
          style={{ cursor: "pointer" }}
        />
        <h1>HRnet</h1>
      </section>
    </header>
  );
};

export default Header;
