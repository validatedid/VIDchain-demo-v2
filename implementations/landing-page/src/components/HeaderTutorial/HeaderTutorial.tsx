import React, { Component } from "react";
import {Grid, Typography, Container} from '@material-ui/core';
import "./HeaderTutorial.css";

import logoVidchain from "../../assets/images/3531224b-vidchain.svg";

function HeaderTutorial () {
    return (
      <header className="headerTutorialBackground">
        <img
          className="logoHeaderTutorial"
          src={logoVidchain}
          alt="Logo"
          onClick={()=> window.location.replace("/demo")}
        />
        <p className="powered">Powered by Validated ID</p>
      </header>
    );
}

export default HeaderTutorial;
