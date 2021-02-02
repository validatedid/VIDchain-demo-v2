import React from 'react';
import {Typography, Grid, Button} from '@material-ui/core';
import "./Panel.css";
import {NextButton} from '../NextButton/NextButton';

type Props = {
  title: string;
  panelText: string;
  iconOn: any;
  iconOff: any;
  stepPanel: number;
  stepSelected: number;
  textButton: string;
  functionClickButton: any;
};

const Panel = (props: Props) => {
  const {title, panelText, iconOn, iconOff, stepPanel, stepSelected, textButton, functionClickButton} = props;
  return (
    <div className={stepSelected === stepPanel ? "containerProfileOn" : "containerProfile"}>
        <Grid container
            direction="row"
            justify="center"
            alignItems="center">
              <Grid item lg={2} sm={12} xs={8}>
                <img
                    src={stepSelected === stepPanel ? iconOn : iconOff}
                    alt=""
                    role="presentation"
                    className={stepSelected === stepPanel ? "panelImageOn" : "PanelImageOff"}
                />
                </Grid>
              <Grid item lg={9} sm={12} xs={10} className={stepSelected === stepPanel ? "panelTitleOn" : "panelTitle"}>
                <Typography variant="h5">{`Step ${stepPanel}`}</Typography>
                <Typography variant="h5">{title}</Typography>
                <div className={stepSelected === stepPanel ? "bodyTextOn" : "bodyTextOff"}>
                  <Typography variant="subtitle1" className="bodyTextPanel">{panelText}</Typography>
                  <NextButton className="buttonPanel" variant="contained" onClick={functionClickButton}>
                    {textButton}
                  </NextButton>
                </div>
              </Grid>

            </Grid>
            
    </div>
  );
};

export default Panel;
