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
            alignItems="flex-start"
            className="panelBody"
            spacing={1}>
              <Grid item sm={2} xs={11}>
                <img
                    src={stepSelected === stepPanel ? iconOn : iconOff}
                    alt=""
                    role="presentation"
                    className="panelImage"
                />
                </Grid>
              <Grid item sm={8} xs={10} className={stepSelected === stepPanel ? "panelTitleOn" : "panelTitle"}>
                <Typography variant="h5">{`Step ${stepPanel}`}</Typography>
                <Typography variant="h5">{title}</Typography>
              </Grid>
              <Grid item sm={8} xs={12} className={stepSelected === stepPanel ? "bodyTextOn" : "bodyTextOff"}>
                <p>{panelText}</p>
                <NextButton className="buttonPanel" variant="contained" onClick={functionClickButton}>
                  {textButton}
                </NextButton>
              </Grid>

            </Grid>
            
         {/* <Grid xs={12} className="panelTitle">
            <Typography variant="h6" className="titlePanel">
                {title}
            </Typography>
        </Grid>
        <Grid xs={12} container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            className="panelBody">
            <Grid item sm={1} xs={12}></Grid>
            <Grid item sm={2} xs={12}>
            <img
                src={icon}
                alt=""
                role="presentation"
                className="panelImage"
            />
            </Grid>
            <Grid item sm={9} xs={12}>
            {!hasBeenRequested &&
              <div className="panelMainContent">
                  <h3 className="titleBody">Description:</h3>
                  <p className="textBody">{description}</p>
                  <h3 className="titleBody">Requirements:</h3>
                  <p className="textBody">{requirements}</p>
                  <p className="textBody"><b>{credentialName} </b>issued by Government of Freedonia</p>
              </div>
            }
            {hasBeenRequested &&
              <div className="panelMainContent">
                  <h3 className="titleBody">Credential sent</h3>
                  <p className="textBody">Check your wallet</p>
              </div>
            }

            </Grid>
              
            </Grid>
              {!hasBeenRequested &&
                <CredentialButton variant="contained" onClick={functionClickButton}>
                  {textButton}
                </CredentialButton>
              } */}
    </div>
  );
};

export default Panel;
