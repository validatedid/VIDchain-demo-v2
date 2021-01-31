import React, { Component } from "react";
import {Grid, Typography} from '@material-ui/core';
import "./Footer.css";

import logoVidchain from "../../assets/images/3531224b-vidchain.svg";



function Footer () {
    return (
        <div>
            <hr className="dividerFooter" />
        
    <Grid container 
        direction="row"
        justify="space-between"
        alignItems="center"
        className="footerBackground">
        
         <Grid item sm={2}></Grid>  
        <Grid item sm={2}>
            <img
            className="logoFooter"
            src={logoVidchain}
            alt="Logo"
            />
        </Grid>
        <Grid item sm={1}></Grid>
        <Grid item sm={1}>
          <p className="textFooter">Privacy policy</p>
        </Grid>
        <Grid item sm={2}>
          <p className="textFooter">Carrer Arago 179 - 4th floor</p>
          <p className="textFooter">08011 Barcelona (Spain)</p>
        </Grid>
        <Grid item sm={2}>
          <p className="textFooter">@Copyright 2020. Validated ID.</p>
          <p className="textFooter">All Rights Reserved</p>
        </Grid>
        <Grid item sm={2}></Grid>
      </Grid>
      </div>
    );
}

export default Footer;
