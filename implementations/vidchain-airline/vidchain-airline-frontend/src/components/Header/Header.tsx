import React, { Component } from "react";
import "./Header.css";


class Header extends Component {
  render() {
    return (
      <header className="headerBackground">
        <img
          className="logoHeader"
<<<<<<< HEAD
          src={require("../../assets/images/airlinelogo.jpg")}
          alt="Logo of the Airlines"
=======
          src={require("../../assets/images/logoHeader.svg")}
          alt="Logo of the Univeristy"
>>>>>>> development
        />
        <p className="powered">Powered by Validated ID</p>
      </header>
    );
  }
}

export default Header;
