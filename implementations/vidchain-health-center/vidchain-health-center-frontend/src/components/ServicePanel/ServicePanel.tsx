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
  const {title, description, requirements, credentialName, icon, hasBeenRequested,textButton, functionClickButton} = props;
  return (
    <Grid className="containerProfile">
        
        <Grid xs={12} className="panelTitle">
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
                  <p className="textBody"><b>{credentialName} </b>issued by Health of Care</p>
              </div>
            }
            {hasBeenRequested &&
              <div className="panelMainContent">
                  <h3 className="titleBody">Credential sent</h3>
                  <p className="textBody">Check your wallet, you will receive a notification.</p>
                  <p className="textBody">Accept it and you will have the credential in your wallet.</p>
                  <a href="/demo/tutorial?step=3" className="textBody">Go back to tutorial</a>
              </div>
            }

            </Grid>
              
            </Grid>
              {!hasBeenRequested &&
                <CredentialButton variant="contained" onClick={functionClickButton}>
                  {textButton}
                </CredentialButton>
                
              }
    </Grid>
  );
};

export default ServicePanel;
