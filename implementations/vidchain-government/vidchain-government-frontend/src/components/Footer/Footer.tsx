import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
        <Grid container className="footer" spacing={6}>
          <Grid item sm={1}></Grid>
          <Grid item xs={12} sm={3} className="logoFooterDiv">
              <img
                className="logoFooter"
                src={require("../../assets/images/logo.svg")}
                alt="City"
              />
            </Grid>
            <Grid item sm={4}></Grid>
            <Grid item xs={12} sm={3}>
              <p className="textFooter">This is not an official website of any Government.</p>
            </Grid>
        </Grid>
    );
  }
}

export default Footer;
