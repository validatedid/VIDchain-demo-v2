import React, { Component } from "react";
import {Grid, Typography} from '@material-ui/core';
import "./Footer.css";

import logoVidchain from "../../assets/images/3531224b-vidchain.svg";



function Footer () {
    return (
        <div className="footerBackground">
            <hr className="dividerFooter" />
        
    <Grid container 
        direction="row"
        justify="center"
        alignItems="center">
        
        <Grid item sm={1} lg={1}></Grid>  
        <Grid item sm={2} xs={12} lg={2}>
            <img
            className="logoFooter"
            src={logoVidchain}
            alt="Logo"
            />
        </Grid>
        <Grid item sm={1} lg={2}></Grid>
        <Grid item sm={1} xs={12} lg={1}>
          <p className="textFooter">Privacy policy</p>
        </Grid>
        <Grid item sm={3} xs={12} lg={2}>
          <p className="textFooter">Carrer Arago 179 - 4th floor</p>
          <p className="textFooter">08011 Barcelona (Spain)</p>
        </Grid>
        <Grid item sm={2} xs={12} lg={2}>
          <p className="textFooter">@Copyright 2020. Validated ID.</p>
          <p className="textFooter">All Rights Reserved</p>
        </Grid>
        <Grid item sm={1} lg={1}></Grid>
      </Grid>
      </div>
    );
}

export default Footer;
