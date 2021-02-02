import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
        <Grid container 
          direction="row"
          justify="center"
          alignItems="center"
          className="footer">
          <Grid item lg={1} xs={1} sm={1}></Grid>
          <Grid item lg={3} xs={5} sm={3} className="logoFooterDiv">
              <img
                className="logoFooter"
                src={require("../../assets/images/logo.svg")}
                alt="City"
              />
            </Grid>
            <Grid item lg={3} xs={1} sm={3}></Grid>
            <Grid item lg={4} xs={5} sm={4}>
              <p className="textFooter">This is not an official website of any Government.</p>
            </Grid>
        </Grid>
    );
  }
}

export default Footer;
