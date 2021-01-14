import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid container spacing={2}>
          <Grid item xs={6} className="logoFooterDiv">
              <img
                className="logoFooter"
                src={require("../../assets/images/logo.svg")}
                alt="City"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" className="textFooter">This is not an official website of any Government.</Typography>
            </Grid>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
