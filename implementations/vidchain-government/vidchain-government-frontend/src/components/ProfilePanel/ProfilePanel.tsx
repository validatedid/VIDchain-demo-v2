import React from 'react';
import "./ProfilePanel.css";
import {Typography, Grid} from '@material-ui/core';
import { verifiableKYC } from "../../interfaces/dtos";

type Props = {
  title: string;
  did: string;
  userData: verifiableKYC;
  icon: any;
};

const ProfilePanel = (props: Props) => {
  const {title, userData, did, icon} = props;
  return (
    <Grid className="containerProfile" justify="space-between">
        
        <Grid xs={12} className="panelTitle">
            <Typography variant="h5" className="titlePanel">
                {title}
            </Typography>
        </Grid>
        <Grid xs={12} className="panelBody">
            <Grid item xs={2} className="panelImageContainer">
            <img
                src={icon}
                alt=""
                role="presentation"
                className="panelImage"
            />
            </Grid>
            <Grid item xs={10}>
                <div className="panelMainContent">
                  <h6 className="titleBody">DID: </h6>
                  <p className="textBody">{did}</p>
                  <h6 className="titleBody">Name: </h6>
                  <p className="textBody">{userData.name}</p>
                  <h6 className="titleBody">Surname: </h6>
                  <p className="textBody">{userData.surname}</p>
                  <h6 className="titleBody">Date Of Birth: </h6>
                  <p className="textBody">{userData.dateOfBirth}</p>
                  <h6 className="titleBody">Document Number: </h6>
                  <p className="textBody">{userData.personalNumber}</p>
                  <h6 className="titleBody">Document Type: </h6>
                  <p className="textBody">{userData.documentType}</p>
                  <h6 className="titleBody">Nationality: </h6>
                  <p className="textBody">{userData.nationality}</p>
                  <h6 className="titleBody">State Issuer: </h6>
                  <p className="textBody">{userData.stateIssuer}</p>
                  <h6 className="titleBody">Date of expiry: </h6>
                  <p className="textBody">{userData.dateOfExpiry}</p>
                  </div>
            </Grid>
        </Grid>
    </Grid>
  );
};

export default ProfilePanel;
