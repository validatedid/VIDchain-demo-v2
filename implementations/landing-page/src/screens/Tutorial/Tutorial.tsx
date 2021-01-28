import React, { Component } from 'react';
import Timeline from '../../components/Timeline';
import './Tutorial.css';
import {Grid, Typography} from '@material-ui/core';

import * as config from "../../config/config";
import logoValidated from "../../assets/images/validated_white.png";
import logoAndroid from "../../assets/images/playStore@3x.png";
import logoUniversity from "../../assets/images/logo_uni.png";
import logoGovernment from "../../assets/images/logoCity.png";
import logoNotification from "../../assets/images/icon_notification.png";
import kyc from "../../assets/images/kyc.png";

import Header from '../../components/Header/Header';


interface Props {
  location: any;
}

interface State {
  step: number;
}

class Tutorial extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      step: +(sessionStorage.getItem("step") || 0),
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
    sessionStorage.setItem("tutorial", "true");
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
    <div className="body">
      <Header />
      <Grid container 
        direction="column"
        justify="space-between"
        alignItems="center"
        className="content">
          <Grid item className="titleHome">
            <Typography variant="h4">{"Test VIDchain user journey demo by taking the following steps in order"}</Typography>
          </Grid>
          <Grid item></Grid>
          <Grid item></Grid>
          <Grid item></Grid>
          <Grid item></Grid>
      </Grid>
      
    </div>
  );
  }
}


export default Tutorial