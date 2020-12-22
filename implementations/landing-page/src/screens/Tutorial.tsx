import React, { Component } from 'react';
import Timeline from '../components/Timeline';
import './Tutorial.css';
import * as config from "../config/config";
import logoVidchain from "../assets/images/VIDchain_horizontal.png";
import logoValidated from "../assets/images/validated_white.png";
import logoApp from "../assets/images/VIDchain_vertical.png";
import logoIOS from "../assets/images/appleAppStore@3x.png";
import logoAndroid from "../assets/images/playStore@3x.png";
import logoUniversity from "../assets/images/logo_uni.png";
import logoGovernment from "../assets/images/logoCity.png";
import logoNotification from "../assets/images/icon_notification.png";

interface Props {

}

interface State {
  step: number
}

class Tutorial extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      step: +(sessionStorage.getItem("step") || 0)
    };
  }

  componentDidMount() {

  }
  continue(){
    const {step} = this.state;
    sessionStorage.setItem("step", String(step+1))
    this.redirectTo(step);
    this.setState(prevState => {
      return {step: prevState.step + 1}
   })
    
  }
  redirectTo(step: number){
    if(step === 0){
      window.open(config.GOVERNMENT_URL);
    }
    if(step === 1){
      window.open(config.UNIVERSITY_URL);
    }
  }
  render() {
    const {step} = this.state;
  return (
    <div className="step-body-background">
      <img className="logo" src={logoVidchain} alt="logo vidchain"/>
        <Timeline step={step}/>
        <div className="step-body">
          <h2 style={{ fontFamily: "TTNorms-Regular", marginLeft: "20px"}}>Welcome to the VIDchain demo tutorial</h2>
          <p style={{ fontFamily: "TTNorms-Regular"}}>
            To test the latest demo, follow the instructions and click the button to continue.
          </p>
          <div className="center">
            <div className="desktop_start" onClick={() => this.continue()}>
              <div className="desktop_start_btn">{step === 0 ? "Start Tutorial" : "Continue"}</div>
            </div>
            <div className="mobile_start" onClick={() => this.continue()}>
              <div className="mobile_start_btn">{step === 0 ? "Start Tutorial" : "Continue"}</div>
            </div>
          </div>
        <div className="step step-body">
          <div id="download">
            <h3 className="heading"><b>Part 0 - VIDchain Wallet</b></h3>
            <p className="has-image-right">
              Complete the KYC process, verifying your identity document and the liveness probe to assure you are the owner of the document using the VIDchain wallet, and you will receive a Verifiable eID,
              that you can use to identificate in other entities.
            </p>
            <div className="links" style={{height: "96px"}}>
            <img src={logoApp} style={{marginRight: "50px", width:"121px"}} alt="logo vidchain app"/>
            <div className="playstore">
              <a id="x" href="https://itunes.apple.com">
                <img src={logoIOS}style={{width:"121px",marginRight: "20px"}} alt="logo ios"/>
              </a>
              <a href="https://play.google.com/store/">
                <img src={logoAndroid} style={{width:"121px"}} alt="logo android"/>
              </a>
            </div>
            </div>
          </div>
          <img src={logoNotification} style={{width: "160px", height:"160px", marginBottom: "10px", marginRight: "25px"}} alt="logo vidchain app"/>
        </div>
        <div className="step step-body">
          <div>
            <h3 className="heading"><b>Part 1 - Government of Freedonia</b></h3>
            <p className="has-image-right">
              Access to you government portal, using the Verifiable eID that you hold in your wallet to probe who you are.
              Once you have access to the portal you can use the government services, and request other credentials like for example a Large Family credential that you can use in other entities to apply for discounts.
            </p>
          </div>
          <img src={logoGovernment} style={{width: "200px", height:"200px", marginRight: "25px"}} alt="logo government"/>
        </div>
        <div className="step step-body">
          <div>
            <h3 className="heading"><b>Part 2 - ACME University</b></h3>
            <p className="has-image-right">
              Access to ACME University where you are already enrolled into a course and after sign-in with VIDchain you will be able to use the university services, like request your diploma degree 
              or apply for a discount using the Large Family credential that you got from your government.
            </p>
          </div>
          <img src={logoUniversity} style={{height:"200px", width:"200px", marginRight: "25px"}} alt="logo university"/>
        </div>
        
      </div>
      <div className="center">
          <div className="desktop_start" onClick={() => this.continue()}>
            <div className="desktop_start_btn">{step === 0 ? "Start Tutorial" : "Continue"}</div>
          </div>
          <div className="mobile_start" onClick={() => this.continue()}>
            <div className="mobile_start_btn">{step === 0 ? "Start Tutorial" : "Continue"}</div>
          </div>
        </div>
        <footer id="footer">
          <h2 style={{fontFamily: "TTNorm-Regular", marginLeft: "0px"}}>Powered by:</h2>
          <a href="https://www.validatedid.com">
            <img className="logoValidated" src={logoValidated} alt="ValidatedID" />
          </a>
          <br/>
          <p style={{float: "right"}}>Copyright 2020, Validated ID, S.L.</p>
    </footer>
    </div>
  );
  }
}


export default Tutorial;
