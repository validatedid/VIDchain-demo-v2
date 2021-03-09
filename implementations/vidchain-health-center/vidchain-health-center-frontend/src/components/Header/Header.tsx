import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <header className="headerBackground">
        <img
          className="logoHeader"
          src={require("../../assets/images/healthCare.png")}
          alt="Logo of the City"
        />
        <p className="powered">Powered by Validated ID</p>
      </header>
    );
  }
}

export default Header;
