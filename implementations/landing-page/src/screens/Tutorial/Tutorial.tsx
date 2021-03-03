import React, { Component,useRef } from 'react';
import './Tutorial.css';
import {Grid, Typography, Container} from '@material-ui/core';
import * as config from "../../config/config";
import logoValidated from "../../assets/images/validated_white.png";
import logoAndroid from "../../assets/images/playStore@3x.png";
import logoUniversity from "../../assets/images/logo_uni.png";
import logoGovernment from "../../assets/images/logoCity.png";
import logoNotification from "../../assets/images/icon_notification.png";
import kyc from "../../assets/images/kyc.png";

import downloadWalletIcon from "../../assets/images/downloadWallet.svg";
import downloadWalletIconOff from "../../assets/images/downloadWalletoff.svg";
import verifyIcon from "../../assets/images/verifyIDIcon.svg";
import verifyIDOff from "../../assets/images/verifyIDoff.svg";
import governmentIcon from "../../assets/images/governmentIcon.svg";
import governmentIconOff from "../../assets/images/governmentIconoff.svg";
import universityIcon from "../../assets/images/universityIcon.svg";
import universityIconOff from "../../assets/images/universityIconoff.svg";

import HeaderTutorial from '../../components/HeaderTutorial/HeaderTutorial';
import Panel from '../../components/Panel/Panel';
import {RestartButton} from '../../components/RestartButton/RestartButton';


interface Props {
  location: any;
}

interface State {
  step: number;
}



class Tutorial extends Component<Props, State> {
  step0Ref;
  step1Ref;
  step2Ref;
  step3Ref;

  constructor(props: any) {
    super(props);
    this.state = {
      step: +(sessionStorage.getItem("step") || 0),
    };
    this.step0Ref = React.createRef();
    this.step1Ref = React.createRef();
    this.step2Ref = React.createRef();
    this.step3Ref = React.createRef();

    this.continue = this.continue.bind(this);
  }

  componentDidMount() {
    const code = new URLSearchParams(this.props.location.search).get("step");
    this.setState({
      step: 0,
    });
    if(code){
      const intCode: number = parseInt(code);
      this.setState({
        step: intCode,
      });
      this.changeFocus(intCode);
    }
    sessionStorage.setItem("tutorial", "true");
  }
  
  continue(){
    const {step} = this.state;
    sessionStorage.setItem("step", String(step+1))
    this.redirectTo(step);
  }

  changeFocus(code:number){
    if(code === 1 ) this.step1Ref.current?.scrollIntoView();
    if(code === 2 ) this.step2Ref.current?.scrollIntoView();
    if(code === 3 ) this.step3Ref.current?.scrollIntoView();
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

  restart(){
    this.setState({
      step: 0,
    });
    sessionStorage.setItem("step", String(0));
    window.location.replace("/demo/tutorial");
  }
render() {
  const {step} = this.state;
  return (
    <Container>
      <HeaderTutorial /> 
      <Grid container 
        direction="column"
        justify="center"
        alignItems="center"
        className="content">
          <Grid item className="titleHome">
            <Typography variant="h3"><b>{"Test VIDchain user journey demo by taking the following steps in order"}</b></Typography>
          </Grid>
          <Grid container
            direction="column"
            justify="space-between"
            alignItems="center" 
            className="panels">
            <Panel 
                title="Download VIDwallet"
                panelText="Find VIDwallet in GooglePlay just clicking on VIDwallet icon. The application is available for Android in the Play Store and for iOS in the App Store."
                stepPanel={0}
                stepSelected={step}
                iconOn={downloadWalletIcon}
                iconOff={downloadWalletIconOff}
                textButton="Next"
                refPanel={this.step0Ref}
                functionClickButton={this.continue}/>

            <Panel
                title="Verify your ID"
                panelText="Once you have installed VIDwallet, go to Credentials and create a new credential verifying your ID or connecting with your Google or Facebook account. By completing this process, you will have verified either your identity card or passport and your liveness. Afterwards, you will receive a Verifiable Credential that you can use to identify yourself later on."
                stepPanel={1}
                stepSelected={step}
                iconOn={verifyIcon}
                iconOff={verifyIDOff}
                textButton="Next"
                refPanel={this.step1Ref}
                functionClickButton={this.continue}/> 

            <Panel 
                title="Government of Freedonia"
                panelText="Go to Government of Freedonia and sign in using the Verifiable eID that you hold in your wallet. Once you have accesed to the portal you can request the Large Familiy credential that you can use in other entities to apply for discounts."
                stepPanel={2}
                stepSelected={step}
                iconOn={governmentIcon}
                iconOff={governmentIconOff}
                textButton="Go to Freedonia"
                refPanel={this.step2Ref}
                functionClickButton={this.continue}/>

            <Panel 
                title="ACME University"
                panelText="Go to ACME University and sign in with VIDchain once more. Here you can request a new credential, namely your Student card. To complete this tutorial, apply for a discount on your student fee presenting the Large Family credential you already hold in your wallet."
                stepPanel={3}
                stepSelected={step}
                iconOn={universityIcon}
                iconOff={universityIconOff}
                textButton="Go to Acme University"
                refPanel={this.step3Ref}
                functionClickButton={this.continue}/>
          </Grid>

          <Grid item className="restartButton">
              <RestartButton variant="contained" onClick={()=> this.restart()}>
                  {"Restart process"}
              </RestartButton>
          </Grid>
      </Grid>

      
    </Container>
  );
  }
}


export default Tutorial