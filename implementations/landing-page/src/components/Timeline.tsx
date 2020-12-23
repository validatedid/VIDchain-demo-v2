import React from "react";
import './Timeline.css';
import logoUniversity from "../assets/images/logo_uni.png";
import logoGovernment from "../assets/images/logoCity.png";
import logoVidchain from "../assets/images/icon_notification.png";
import kyc from "../assets/images/kyc.png";

const getStep = (number: Number, index: Number): string => {
    if(number === index) return "entryCurrent";
    if(number > index) return  "entry";
    return "entryNoSelected";
};

const Timeline = ({
    step,
  }) => (
    <div>
        <div className="bar"></div>
        <div className="timeline">
        <a href="#download">
            <div className={getStep(step,0)}>
                <h1>Step 0</h1>
                <h2>Download VIDwallet</h2>
                <div className="img-container">
                    <img src={logoVidchain} className="logoTimeline" alt="vidchain logo"/> 
                    <p>Install VIDwallet App<br/>in your smartphone</p>
                </div>
            </div>
        </a>
        <a href="#download">
            <div className={getStep(step,1)}>
                <h1>Step 1</h1>
                <h2>Get your Verifiable eID</h2>
                <div className="img-container">
                    <img src={kyc} className="logoTimeline" alt="vidchain logo"/> 
                    <p>Get your first credential by proving<br/> liveliness and verifying your identity</p>
                </div>
            </div>
        </a>
        <a href="/demo/government">
            <div className={getStep(step,2)}>
                <h1>Step 2</h1>
                <h2>Government of Freedonia</h2>
                <div className="img-container">
                    <img src={logoGovernment} className="logoTimeline" alt="government logo"/> 
                    <p>Access to Government of Freedonia<br/>with VIDchain and request Large Family Credential</p>
                </div>
            </div>
        </a>
        <a href="/demo/university">
            <div className={getStep(step,3)}>
            <h1>Step 3</h1>
                <h2>University</h2>
                <div className="img-container">
                    <img src={logoUniversity} className="logoTimeline" alt="university logo"/> 
                    <p>Access to ACME university and request a discount<br/>  presenting your Large Family Credential</p>
                </div>
            </div>
        </a>
        </div>
    </div>
  );

export default Timeline;