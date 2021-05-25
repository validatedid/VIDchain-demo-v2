import React, { Component } from "react";
import {Typography, Grid, Dialog, DialogActions, DialogTitle, DialogContent, Button, DialogContentText} from '@material-ui/core';
import Header from "../../components/Header/Header";
import "./Profile.css";
import * as utils from "../../utils/utils";
import * as airlineBackend from "../../apis/airlineBackend";
import * as vidchain from "../../apis/vidchain";
import io from "socket.io-client";
import { ICredentialData } from "../../interfaces/ICredentialData";
import { ICredentialSubject } from "../../interfaces/ICredentialSubject";
import * as config from "../../config";
import { verifiableKYC } from "../../interfaces/dtos";
import { PresentationPayload, VerifiableCredential } from "../../interfaces/IPresentation";
import ServicePanel from "../../components/ServicePanel/ServicePanel";

import iconProfile from "../../assets/images/iconProfile.svg";


interface Props {
  did: string;
  jwt: string;
  history?: any;
  location: any;
}

interface State {
  did: string;
  verifiableKYC: verifiableKYC;
  vaccinePresented: boolean;
  vaccineRequested: boolean;
  studentCard: boolean;
  socketSession: string;
  type: string;
  data: any;
}

class Profile extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    const {state} = this.props.location;
    this.state = {
      did: state ? utils.getUserDid(state.id_token) : '',
      vaccinePresented: false,
      vaccineRequested: false,
      studentCard: false,
      socketSession: "",
      verifiableKYC: {} as verifiableKYC,
      type: "",
      data: {}
    };
    
    this.generateTicket = this.generateTicket.bind(this);
    this.claimVP = this.claimVP.bind(this);
  }

  async componentDidMount() {
      await this.initiateSocket();
      const {state} = this.props.location;
      if(state && state.id_token){
            const presentation: PresentationPayload = state.id_token;
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
            did: utils.getUserDid(this.props.location.state.id_token),
          });
      }
      if(state && state.presentation){
        const did = state.presentation.did;
        const credential: VerifiableCredential = state.presentation.vp.verifiableCredential[0] as VerifiableCredential;
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
          did: did,
          });
          
        }
      if(state && state.did){
        this.generateTicket();
        this.setState({
          did: this.props.location.state.did,
          type: this.props.location.state.type,
          data: this.props.location.state.data,
          vaccinePresented: true,
        });

      }
  }

  async initiateSocket() {
    const socket = io(config.BACKEND_WS, {
      path: "/airlinews",
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      this.setState({
        socketSession: socket.id,
      });
      const socketClient = {
        did: this.state.did,
        clientId: this.state.socketSession,
      };
      if(socketClient.clientId && socketClient.did && socketClient.clientId !== "" && socketClient.did !== ""){
        console.log(`FRONT: socketClient.did: ${JSON.stringify(socketClient.did)}`);
        console.log(`FRONT: socketClient.clientId: ${JSON.stringify(socketClient.clientId)}`);
        socket.emit("whoami", socketClient);
      }
    });

    socket.on("largeFamilyPresentation", (msg: any) => {
      this.generateTicket();
      this.setState({
        vaccinePresented: true,
      });
    });
  }

  /**
   * VIDCHAIN API REQUEST: Generate Verifiable Credential
   * An authentication token is requested and it is used to request the generation of a verifiableCredential
   */
  async generateTicket() {
    this.setState({
      studentCard: true,
    });
    const token = await vidchain.getAuthzToken();

    let subject: ICredentialSubject = {
      id: this.state.did,
      from: "Barcelona-El Prat",
      to: "Paris Beauvais",
      date: "Tomorrow at 10:30",
      seat: "23C"
    };

    let credential: ICredentialData = {
      type: ["VerifiableCredential", "TicketFlight"],
      issuer: utils.getIssuerDid(token),
      id: this.state.did,
      credentialSubject: subject,
    };
    const response = await vidchain.generateVerifiableCredential(
      token,
      credential
    );
  }

  /**
   *  VIDCHAIN API REQUEST: Claim Verifiable Presentation (forwarded to backend)
   * The request of a Verifiable presentation is handled in the backend so as to process the whole flow there and receive a response from the API in a callback
   */
  async claimVP() {
    const {did} = this.state;
    this.setState({
      vaccineRequested: true,
    });
    let redirectUri = "";
    if(utils.isMobileOrTablet()){
      const sessionId = utils.randomString(8);
      redirectUri = config.APP_URL + "/presentation?sessionId="+sessionId+"&did="+did+"&type=VaccinationCertificate";
      const body = {
        did,
        sessionId,
      }
      await airlineBackend.createSession(body);
    }
    airlineBackend.claimVP(did, "VaccinationCertificate", redirectUri);
  }

  render() {
    const {
      did,
      verifiableKYC,
      vaccinePresented,
      vaccineRequested,
    } = this.state;
    return (
      <Grid container 
        direction="column"
        className="profileHome">

        <Grid item>
           <Header />
        </Grid>
        
        <Grid item className="titleProfile">
          <Typography variant="h2">{"Welcome to your\nAirline Portal"}</Typography>
          {/* <Typography variant="h1">{'Freedonia Citizen Portal'}</Typography> */}
        </Grid>
        <Grid container
          direction="column"
          justify="space-between"
          alignItems="center" 
          className="panels">

          <ServicePanel 
              title="Your Flights"
              subtitle1={"Hi, "+ (verifiableKYC.surname ? (verifiableKYC.name + " " + verifiableKYC.surname) : verifiableKYC.name)}
              description1={"You have a flight from Barcelona-El Prat to Paris Beauvais for Tomorrow at 10.30.\n\n\n"+
              "\nYou can do now the Check In to get the ticket for your flight.\n"}
              subtitle2="Requirements"
              description2={"In order to get the ticket, you will have to prove you you have received the Covid-19 Vaccination Certificate."}
              credentialName="Present your Vaccination Certificate"
              icon={iconProfile}
              textButton="Check In"
              functionClickButton={this.claimVP}
              hasBeenValidated={vaccinePresented}
              hasBeenRequested={vaccineRequested} />            
          </Grid>
      </Grid>
    );
  }
}

export default Profile;
