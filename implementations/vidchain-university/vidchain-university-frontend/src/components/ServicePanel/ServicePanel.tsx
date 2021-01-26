import React from 'react';
import {Typography, Grid, Button} from '@material-ui/core';
import "./ServicePanel.css";
import {CredentialButton} from '../CredentialButton/CredentialButton';

type Props = {
  title: string;
  subtitle1: string;
  description1: string;
  subtitle2: string;
  description2: string;
  icon: any;
  hasBeenRequested: boolean;
  subtitle3?: string;
  description3?: string;
  credentialName?: string;
  functionClickButton?: any;
  textButton?: string;
};

const ServicePanel = (props: Props) => {
  const {title, subtitle1, subtitle2, subtitle3,description1, description2,description3, credentialName, icon, hasBeenRequested,textButton, functionClickButton} = props;
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
            {!hasBeenRequested &&
              <div className="panelMainContent">
                  <h3 className="titleBody">{subtitle1}:</h3>
                  <p className="textBody">{description1}</p>
                  <h3 className="titleBody">{subtitle2}:</h3>
                  <p className="textBody">{description2}</p>
                  {subtitle3 &&
                    <div>
                      <h3 className="titleBody">{subtitle3}:</h3>
                      <p className="textBody">{description3}</p>
                    </div>
                  }
                  {credentialName &&
                    <p className="textBody"><b>{credentialName} </b>issued by Government of Freedonia</p>
                  }
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
              {(!hasBeenRequested && functionClickButton) &&
                <CredentialButton variant="contained" onClick={functionClickButton}>
                  {textButton}
                </CredentialButton>
              }
    </Grid>
  );
};

export default ServicePanel;
