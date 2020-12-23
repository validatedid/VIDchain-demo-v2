import React, { Component } from 'react';
import Timeline from '../components/Timeline';
import './Tutorial.css';
import * as config from "../config/config";
import logoValidated from "../assets/images/validated_white.png";
import logoAndroid from "../assets/images/playStore@3x.png";
import logoUniversity from "../assets/images/logo_uni.png";
import logoGovernment from "../assets/images/logoCity.png";
import logoNotification from "../assets/images/icon_notification.png";
import kyc from "../assets/images/kyc.png";
import logoVidchain from "../assets/images/3531224b-vidchain.svg";


interface Props {
  location: any;
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
    const code = new URLSearchParams(this.props.location.search).get("step");
    this.setState({
      step: 0,
    });
    if(code){
      this.setState({
        step: parseInt(code),
      });
    }

  }
  continue(){
    const {step} = this.state;
    sessionStorage.setItem("step", String(step+1))
    this.redirectTo(step);
  }

  redirectTo(step: number){
    if(step === 0){
      window.location.replace("/demo/tutorial?step=1");
      this.setState({
        step: 1,
      });
    }
    if(step === 1){
      window.location.replace("/demo/tutorial?step=2");
      this.setState({
        step: 2,
      });
    }
    if(step === 2){
      window.location.replace(config.GOVERNMENT_URL);
    }
    if(step === 3){
      window.location.replace(config.UNIVERSITY_URL);
    }
    if(step === 4){
      window.location.replace("/demo/tutorial");
    }
  }
  render() {
    const {step} = this.state;
  return (
    <div className="step-body-background">
      <img className="logo" src={logoVidchain} width="180" height="30" style={{marginLeft:"-100px"}}/>
        <Timeline step={step}/>
        <div className="step-body">
        <div className="step step-body">
          <div id="download">
            <h3 className="heading"><b>Step 0 - Download VIDwallet</b></h3>
            {step === 0 && <p className="has-image-right">
            Find VIDwallet in GooglePlay just clicking on VIDwallet icon.<br/> The application is currently available only for Android.<br/> An iOS version will be released soon in the App Store. 
            </p>}
            <div className="center">
            {step === 0 && <div className="desktop_start" onClick={() => this.continue()}>
              <div className="desktop_start_btn">Next</div>
            </div>}
            {step === 0 && <div className="mobile_start" onClick={() => this.continue()}>
               <div className="mobile_start_btn">Next</div>
            </div>}
        </div>
          </div>
            {step === 0 &&<div className="playstore">
              <a href="https://play.google.com/store/apps/details?id=com.validatedid.wallet">
                <img src={logoNotification} style={{width: "60px", height:"60px"}} alt="logo vidchain app"/>
              </a>
            </div>}
            {step === 0 && <img src={logoAndroid} style={{width:"121px",marginRight:"50px", marginLeft:"-300px"}}/>}
        </div>
        <div className="step step-body">
          <div id="download">
            <h3 className="heading"><b>Step 1 - Verify your ID</b></h3>
            {step === 1 && <p className="has-image-right">
              Once you have installed VIDwallet, go to Credentials and create a new credential verifying your ID. By completing this process, you will have verified either your identity card or passport and your liveness. Afterwards, you will receive a Verifiable Credential that you can use to identify yourself later on.
            </p>}
            <div className="center">
            {step === 1 && <div className="desktop_start" onClick={() => this.continue()}>
              <div className="desktop_start_btn">Next</div>
            </div>}
            {step === 1 && <div className="mobile_start" onClick={() => this.continue()}>
              <div className="mobile_start_btn">Next</div>
            </div>}
        </div>
          </div>
          {step === 1 && <img src={kyc} style={{width:"121px", marginRight:"100px"}}/>}
        </div>
        <div className="step step-body">
          <div>
            <h3 className="heading"><b>Step 2 - Government of Freedonia</b></h3>
            {step === 2 && <p className="has-image-right">
              Go to Goverment of Freedonia and sign in using the Verifiable eID that you hold in your wallet.
              Once you have accessed to the portal you can request the Large Family credential that you can use in other entities to apply for discounts.
            </p>}
            <div className="center">
            {step === 2 && <div className="desktop_start" onClick={() => this.continue()}>
              <div className="desktop_start_btn">Go to Freedonia</div>
            </div>}
            {step === 2 && <div className="mobile_start" onClick={() => this.continue()}>
              <div className="mobile_start_btn">Go to Freedonia</div>
            </div>}
            </div>
          </div>
          {step === 2 && <img src={logoGovernment} style={{width: "200px", height:"200px", marginRight: "25px"}} alt="logo government"/>}
        </div>
        <div className="step step-body">
          <div>
            <h3 className="heading"><b>Step 3 - ACME University</b></h3>
            {step === 3 && <p className="has-image-right">
              Go to ACME University and sign in with VIDchain once more. Here you can request a new credential, namely your Student card. To complete this tutorial, apply for a discount on your student fee presenting the Large Family credential  you already hold in your wallet.
            </p>}
            <div className="center">
            {step === 3 && <div className="desktop_start" onClick={() => this.continue()}>
              <div className="desktop_start_btn">Go to ACME University</div>
            </div>}
            {step === 3 && <div className="mobile_start" onClick={() => this.continue()}>
              <div className="mobile_start_btn">Go to ACME University</div>
            </div>}
            </div>
          </div>
          {step === 3 && <img src={logoUniversity} style={{height:"200px", width:"200px", marginRight: "25px"}} alt="logo university"/>}
        </div>
        {step === 4 && <div>
          <div>
            <p>
              Congratulations! You have completed the tutorial successfully.
            </p>
            <div className="center">
            <div className="desktop_start" onClick={() => this.continue()}>
              <div className="desktop_start_btn">Start again</div>
            </div>
            <div className="mobile_start" onClick={() => this.continue()}>
              <div className="mobile_start_btn">Start again</div>
            </div>
            </div>
          </div>
        </div>
        }
      </div>
        <footer id="footer">
          <br/>
          <h5 style={{fontFamily: "Raleway", marginLeft: "0px"}}>Powered by:</h5>
          <a href="https://www.validatedid.com">
            <img className="logoValidated" src={logoValidated} alt="ValidatedID" />
          </a>
          <p style={{float: "right"}}>Copyright 2020, Validated ID, S.L.</p>
    </footer>
    </div>
  );
  }
}


export default Tutorial