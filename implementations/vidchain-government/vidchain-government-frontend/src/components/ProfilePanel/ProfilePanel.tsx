import React from 'react';
import "./ProfilePanel.css";
import {Container} from '@material-ui/core';
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
    <Container className="containerProfile">
        <div className="panelTitle">
            {title}
        </div>
        <div className="panelBody">
            <div className="panelImageContainer">
            <img
                src={icon}
                alt=""
                role="presentation"
                className="panelImage"
            />
            </div>
            <div className="panelMainContent">
                <div className="form-row">
                  <h3 className="panelBodyTitle">DID: </h3>
                  <p className="panelBodyText">&nbsp;{did}</p>
                </div>
                <div className="form-row">
                  <h3 className="panelBodyTitle">Name: </h3>
                  <p className="panelBodyText">&nbsp;{userData.name}</p>
                </div>
                <div className="form-row">
                  <h3 className="panelBodyTitle">Surname: </h3>
                  <p className="panelBodyText">&nbsp;{userData.surname}</p>
                </div>
                <div className="form-row">
                  <h3 className="panelBodyTitle">Date Of Birth: </h3>
                  <p className="panelBodyText">&nbsp;{userData.dateOfBirth}</p>
                </div>
                <div className="form-row">
                  <h3 className="panelBodyTitle">Document number: </h3>
                  <p className="panelBodyText">&nbsp;{userData.personalNumber}</p>
                </div>
                <div className="form-row">
                  <h3 className="panelBodyTitle">Document type: </h3>
                  <p>&nbsp;{userData.documentType}</p>
                </div>
                <div className="form-row">
                  <h3 className="panelBodyTitle">Nationality: </h3>
                  <p className="panelBodyText">&nbsp;{userData.nationality}</p>
                </div>
                <div className="form-row">
                  <h3 className="panelBodyTitle">State Issuer: </h3>
                  <p className="panelBodyText">&nbsp;{userData.stateIssuer}</p>
                </div>
                <div className="form-row">
                  <h3 className="panelBodyTitle">Date of expiry: </h3>
                  <p className="panelBodyText">&nbsp;{userData.dateOfExpiry}</p>
                </div>
            </div>
        </div>
    </Container>
  );
};

export default ProfilePanel;
