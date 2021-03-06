import React, { Component } from "react";
import {Grid, Typography, Container} from '@material-ui/core';
import "./Header.css";

import logoVidchain from "../../assets/images/3531224b-vidchain.svg";


function Header () {
    return (
      <header className="headerBackground">
        <img
          className="logoHeader"
          src={logoVidchain}
          alt="Logo"
          onClick={()=> window.location.replace("/demo")}
        />
        <a href="/demo/tutorial" className="tutorial">Start tutorial</a>
      </header>
    );
}

export default Header;
