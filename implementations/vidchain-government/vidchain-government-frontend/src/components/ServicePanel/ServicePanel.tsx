import React from 'react';
import {Typography, Grid, Button} from '@material-ui/core';
import "./ServicePanel.css";
import {CredentialButton} from '../CredentialButton/CredentialButton';

type Props = {
  title: string;
  description: string;
  requirements: string;
  credentialName: string;
  icon: any;
  hasBeenRequested: boolean;
  functionClickButton: any;
  textButton: string;
};

const ServicePanel = (props: Props) => {
  const {title, description, requirements, credentialName, icon, hasBeenRequested, functionClickButton, textButton} = props;
  return (
    <Grid className="containerProfile">
        
        <Grid xs={12} className="panelTitle">
            <Typography variant="h5" className="titlePanel">
                {title}
            </Typography>
        </Grid>
        <Grid xs={12} container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            className="panelBody">
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
            <img
                src={icon}
                alt=""
                role="presentation"
                className="panelImage"
            />
            </Grid>
            <Grid item xs={9}>
              <div className="panelMainContent">
                  <h3 className="titleBody">Description:</h3>
                  <p className="textBody">{description}</p>
                  <h3 className="titleBody">Requirements:</h3>
                  <p className="textBody">{requirements}</p>
                  <p className="textBody">{credentialName} issued by Government of Freedonia</p>
              </div>

            </Grid>
              
            </Grid>
              <CredentialButton variant="contained" onClick={functionClickButton}>
                Sign in with VIDchain
              </CredentialButton>
    </Grid>
  );
};

export default ServicePanel;
