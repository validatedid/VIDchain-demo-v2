import React, { Component } from "react";
import "./Header.css";

import logoVidchain from "../../assets/images/3531224b-vidchain.svg";

function Header () {
    return (
      <header className="headerBackground">
        <img
          className="logoHeader"
          src={logoVidchain}
          alt="Logo"
        />
        <p className="powered">Powered by Validated ID</p>
      </header>
    );
}

export default Header;
