import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <header>
        <img
          className="logoHeader"
          src={require("../../assets/images/logoHeader.svg")}
          alt="Logo of the Univeristy"
        />
      </header>
    );
  }
}

export default Header;
