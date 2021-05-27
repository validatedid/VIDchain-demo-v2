import React, { Component } from "react";
import "./Profile.css";
import {Typography, Grid, Dialog, DialogActions, DialogTitle, DialogContent, Button, DialogContentText} from '@material-ui/core';
import Header from "../../components/Header/Header";
import { ICredentialData, InputCredential } from "../../interfaces/dtos";
import * as vidchain from "../../apis/vidchain";
import { OpenIDClient } from "../../libs/openid-connect/client";
import * as utils from "../../utils/utils";
import * as config from "../../config";
import { verifiableKYC } from "../../interfaces/dtos";
import { PresentationPayload, VerifiableCredential } from "../../interfaces/IPresentation";
import ProfilePanel from "../../components/ProfilePanel/ProfilePanel";
import ServicePanel from "../../components/ServicePanel/ServicePanel";

import profileIcon from "../../assets/images/profileIcon.svg";
import largeFamilyIcon from "../../assets/images/iconLargeFamily.svg";



interface Props {
  user: string;
  location: any;
  history?: any;
}

interface State {
  user: ICredentialData;
  did: string;
  hasVaccineRequested: boolean;
  hasInsuranceRequested: boolean;
  verifiableKYC: verifiableKYC;
  popUpisOpen: boolean;
}

class Profile extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {} as ICredentialData,
      hasVaccineRequested: false,
      hasInsuranceRequested: false,
      did: "",
      verifiableKYC: {} as verifiableKYC,
      popUpisOpen: false
    };

    this.generateCredential = this.generateCredential.bind(this);
    this.generateEuropeanHealthInsuranceCardCredential = this.generateEuropeanHealthInsuranceCardCredential.bind(this);
  }

  componentDidMount() {
    try{
      const {state} = this.props.location;
      if(state && state.id_token){
        const presentation: PresentationPayload = utils.decodeJWT(state.id_token);
        const credential: VerifiableCredential = presentation.vp.verifiableCredential[0] as VerifiableCredential;
        this.setState({
          verifiableKYC: {
            id: credential.credentialSubject.id as string,
            documentNumber: credential.credentialSubject.documentNumber as string,
            documentType: credential.credentialSubject.documentType as string,
            name: (credential.credentialSubject.firstName ? credential.credentialSubject.firstName : credential.credentialSubject.name) as string,
            surname: credential.credentialSubject.lastName as string,
            fullName: credential.credentialSubject.fullName as string,
            nationality: credential.credentialSubject.nationality as string,
            stateIssuer: credential.credentialSubject.stateIssuer as string,
            issuingAuthority: credential.credentialSubject.issuingAuthority as string,
            dateOfExpiry: credential.credentialSubject.dateOfExpiry as string,
            dateOfBirth: credential.credentialSubject.dateOfBirth as string,
            placeOfBirth: credential.credentialSubject.placeOfBirth as string,
            sex: credential.credentialSubject.gender as string,
            personalNumber: credential.credentialSubject.personalNumber as string,
          },
        did: utils.getUserDid(this.props.location.state.id_token)
      });
        }
      var client = OpenIDClient.getInstance().getClient();
      client.wipeTokens();
    }
    catch(error){
      window.location.replace("/demo/healthcenter");
    }
  }
  /**
   *  VIDCHAIN API REQUEST: Generate Verifiable Credential
   * An authentication token is requested and it is used to request the generation of a verifiableCredential
   */
  async generateCredential() {
    const {verifiableKYC} = this.state;
    const token = await vidchain.getAuthzToken();
    const credential: InputCredential = {
        type: ["VerifiableCredential", "VaccinationCertificate"],
        issuer: utils.getIssuerDid(token),
        id: "https://example.com/credential/2590",
        issuanceDate: new Date().toISOString(),
        credentialSubject: {
          id: this.state.did,
          type: "VaccinationEvent",
          batchNumber: "1183738569",
          administeringCentre: "Health Care Center",
          healthProfessional: "MoH",
          countryOfVaccination: "ES",
          recipient: {
            type: "VaccineRecipient",
            givenName: verifiableKYC.name,
            familyName: verifiableKYC.surname,
            gender: verifiableKYC.sex,
            birthDate: verifiableKYC.dateOfBirth
          },
          vaccine: {
            type: "Vaccine",
            disease: "COVID-19",
            atcCode: "J07BX03",
            medicinalProductName: "COVID-19 Vaccine Moderna",
            marketingAuthorizationHolder: "Moderna Biotech"
          }
        }
    };
    
    const response = await vidchain.generateVerifiableCredential(
      token,
      credential
    );
    this.setState({
      hasVaccineRequested: true,
    });
  }

  async generateEuropeanHealthInsuranceCardCredential() {
    const {verifiableKYC} = this.state;
    const token = await vidchain.getAuthzTokenDidKey();
    console.log(token);
    const credential: InputCredential = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://essif-lab.pages.grnet.gr/interoperability/eidas-generic-use-case/contexts/ehic-v1.jsonld",
        "https://essif-lab.pages.grnet.gr/interoperability/eidas-generic-use-case/contexts/cades-signature.jsonld",
        "https://essif-lab.pages.grnet.gr/interoperability/eidas-generic-use-case/contexts/train-trustScheme.jsonld"
      ],
      id: "https://ec.europa.eu/credentials/83627465",
      type: [
        "VerifiableCredential",
        "EuropeanHealthInsuranceCard"
      ],
      issuer: utils.getIssuerDid(token),
      name: "European Health Insurance Card",
      description: "Example of a European Health Insurance Card",
      expirationDate: "2029-12-03T12:19:52Z",
      institutionID: "09999 - INSS Madrid",
      issuanceDate: "2029-12-03T12:19:52Z",
      cardNo: "80756099990000034111",
      personalID: "09999 111999",
      credentialSubject: {
        id: this.state.did,
        type: [
          "EuropeanHealthInsuranceHolder",
          "Person"
        ],
        familyName: verifiableKYC.surname,
        givenName: verifiableKYC.name,
        birthDate: verifiableKYC.dateOfBirth
      },
      termsOfUse: [{
        "type": "https://train.trust-scheme.de/info",
        "trustScheme": ["ehic.europe.lightest.nlnetlabs.nl"]
      }]
    };
    
    const response = await vidchain.generateVerifiableCredential(
      token,
      credential
    );
    this.setState({
      hasInsuranceRequested: true,
    });
  }

  render() {
    const {
      did,
      verifiableKYC,
      hasVaccineRequested,
      hasInsuranceRequested
    } = this.state;
    return (
      <div className="profileHome">
        <Header />
      <Grid container 
        direction="column"
        justify="center"
        alignItems="center"
        className="profileHome">

        <Grid item className="titleProfile">
          <Typography variant="h2">{"Welcome to your Health Care Center"}</Typography>
          {/* <Typography variant="h1">{'Freedonia Citizen Portal'}</Typography> */}
        </Grid>
        <Grid container
          direction="column"
          justify="space-between"
          alignItems="center" 
          className="panels">
            <ProfilePanel 
              title="Your Profile"
              userData={verifiableKYC}
              did={did}
              icon={profileIcon}
            />
            
            <ServicePanel 
              title="Request your European Health Insurance Credential"
              description="Use your European Health Insurance to travel around Europe safely."
              requirements="In order to get this credential you will have to be authenticated with our services"
              credentialName="European Health Insurance Credential"
              icon={profileIcon}
              textButton="Get European Health Insurance Credential"
              functionClickButton={this.generateEuropeanHealthInsuranceCardCredential}
              hasBeenRequested={hasInsuranceRequested} />

            <ServicePanel 
              title="Request your Vaccination Certificate Credential"
              description="You can use it wherever you go: to buy a ticket in an airlines, to travel to another city..."
              requirements="In order to get this credential you will have to prove you have received the Covid-19 vaccine"
              credentialName="Present your Vaccination Certificate Credential"
              icon={profileIcon}
              textButton="Get Vaccination Certificate Credential"
              functionClickButton={this.generateCredential}
              hasBeenRequested={hasVaccineRequested} />

          </Grid>
      </Grid>
      </div>
    );
  }
}

export default Profile;
