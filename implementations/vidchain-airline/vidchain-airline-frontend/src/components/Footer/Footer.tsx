import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
       <img
                className="logoFooter"
                src={require("../../assets/images/airlinelogo.png")}
                alt="City"
              />
      <p className="textFooter">This is not an official website of any Airline.</p>
    </footer>
        
    );
  }
}

export default Footer;
