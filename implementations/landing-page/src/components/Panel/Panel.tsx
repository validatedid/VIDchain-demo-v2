import React from 'react';
import {Typography, Grid, Button} from '@material-ui/core';
import "./Panel.css";
import {NextButton} from '../NextButton/NextButton';

type Props = {
  title: string;
  panelText: string;
  icon: any;
  stepPanel: number;
  stepSelected: number;
  textButton: string;
  functionClickButton: any;
};

const Panel = (props: Props) => {
  const {title, panelText, icon, stepPanel, stepSelected, textButton, functionClickButton} = props;
  return (
    <Grid xs={12} container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        className="containerProfile">
            <Grid item xs={12} className="panelTitle">
                <Typography variant="h6">
                    {title}
                </Typography>
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
    </Grid>
  );
};

export default Panel;
