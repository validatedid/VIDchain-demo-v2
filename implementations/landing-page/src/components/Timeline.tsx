import React from "react";
import './Timeline.css';

const logoUniversity = require("../assets/images/logo_uni.png");
const logoGovernment = require("../assets/images/logoCity.png");
const logoVidchain = require("../assets/images/icon_notification.png");

const Timeline = ({
    step,
  }) => (
    <div>
        <div className="bar"></div>
        <div className="timeline">
        <a href="#download">
            <div className="entry">
                <h1>Step 0</h1>
                <h2>VIDchain Wallet</h2>
                <div className="img-container">
                    <img src={logoVidchain} className="logoTimeline" alt="vidchain logo"/> 
                    <p>Install the VIDchain App<br/>and create your Verifiable eID</p>
                </div>
            </div>
        </a>
        <a href="https://dev.vidchain.net/demo/government">
            <div className={step > 0 ? "entry" : "entryNoSelected"}>
                <h1>Step 1</h1>
                <h2>Government of Freedonia</h2>
                <div className="img-container">
                    <img src={logoGovernment} className="logoTimeline" alt="government logo"/> 
                    <p>Access to your government account<br/>with VIDchain and use their services</p>
                </div>
            </div>
        </a>
        <a href="https://dev.vidchain.net/demo/university">
            <div className={step > 1 ? "entry" : "entryNoSelected"}>
            <h1>Step 2</h1>
                <h2>University</h2>
                <div className="img-container">
                    <img src={logoUniversity} className="logoTimeline" alt="university logo"/> 
                    <p>Access to your university portal<br/>and get your diploma</p>
                </div>
            </div>
        </a>
        </div>
    </div>
  );

export default Timeline;