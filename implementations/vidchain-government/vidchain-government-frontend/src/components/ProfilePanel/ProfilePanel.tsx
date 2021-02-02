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
  console.log(userData);
  return (
    <Grid className="containerProfile">
        
        <Grid lg={12} sm={12} xs={12} className="panelTitle">
            <Typography variant="h6" className="titlePanel">
                {title}
            </Typography>
        </Grid>
        <Grid lg={12} sm={12} xs={12} container
            direction="row"
            justify="center"
            alignItems="flex-start"
            className="panelBody">
            <Grid item lg={1} xs={12}></Grid>
            <Grid item lg={2} sm={2} xs={12}>
            <img
                src={icon}
                alt=""
                role="presentation"
                className="panelImage"
            />
            </Grid>
            <Grid item lg={9} sm={10} xs={12}>
                <div className="panelMainContent">
                  <h6 className="titleBody">DID: </h6>
                  <p className="textBody">{did}</p>
                  {userData.name && 
                     <div>
                      <h6 className="titleBody">Name: </h6>
                      <p className="textBody">{userData.name}</p>
                    </div>
                  }
                  {userData.surname && 
                     <div>
                      <h6 className="titleBody">Surname: </h6>
                      <p className="textBody">{userData.surname}</p>
                    </div>
                  }
                  {userData.dateOfBirth && 
                    <div>
                      <h6 className="titleBody">Date Of Birth: </h6>
                      <p className="textBody">{userData.dateOfBirth}</p>
                    </div>
                  }
                  {userData.personalNumber && 
                    <div>
                      <h6 className="titleBody">Document Number: </h6>
                      <p className="textBody">{userData.personalNumber}</p>
                    </div>
                  }
                  {userData.documentType && 
                    <div>
                      <h6 className="titleBody">Document Type: </h6>
                      <p className="textBody">{userData.documentType}</p>
                    </div>
                  }
                  {userData.nationality && 
                      <div>
                        <h6 className="titleBody">Nationality: </h6>
                        <p className="textBody">{userData.nationality}</p>
                      </div>
                    }
                    {userData.stateIssuer && 
                      <div>
                        <h6 className="titleBody">State Issuer: </h6>
                        <p className="textBody">{userData.stateIssuer}</p>
                      </div>
                    }
                    {userData.dateOfExpiry && 
                      <div>
                        <h6 className="titleBody">Date of expiry: </h6>
                        <p className="textBody">{userData.dateOfExpiry}</p>
                      </div>
                    }
                  </div>
            </Grid>
        </Grid>
    </Grid>
  );
};

export default ProfilePanel;
