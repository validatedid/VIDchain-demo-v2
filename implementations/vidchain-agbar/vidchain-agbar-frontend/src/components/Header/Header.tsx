import React, { Component } from "react";
import "./Header.css";


class Header extends Component {
  render() {
    return (
      <header className="headerBackground">
        <img
          className="logoHeader"
          src="https://www.aiguesdebarcelona.cat/ofexabpublic-theme/images/ab_logo.png"
          alt="Logo of the AGBAR"
        />
        <p className="powered">Powered by Validated ID</p>
      </header>
    );
  }
}

export default Header;
