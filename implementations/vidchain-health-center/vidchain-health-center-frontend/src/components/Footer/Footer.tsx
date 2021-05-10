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
                src={require("../../assets/images/healthCareLogo.png")}
                alt="City"
              />
      <p className="textFooter">This is not an official website of any Health Care Center.</p>
    </footer>
        
    );
  }
}

export default Footer;
