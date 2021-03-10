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

<<<<<<< HEAD
=======
import iconCourse from "../../assets/images/iconCourse.svg";
import iconLargeFamily from "../../assets/images/iconLargeFamily.svg";
>>>>>>> development
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
<<<<<<< HEAD
  vaccinePresented: boolean;
  vaccineRequested: boolean;
=======
  largeFamily: boolean;
  discountRequested: boolean;
>>>>>>> development
  studentCard: boolean;
  socketSession: string;
  type: string;
  data: any;
  popUpisOpen: boolean;
}

class Profile extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    const {state} = this.props.location;
    this.state = {
      did: state ? utils.getUserDid(state.id_token) : '',
<<<<<<< HEAD
      vaccinePresented: false,
      vaccineRequested: false,
=======
      largeFamily: false,
      discountRequested: false,
>>>>>>> development
      studentCard: false,
      socketSession: "",
      verifiableKYC: {} as verifiableKYC,
      type: "",
      data: {},
      popUpisOpen: false,
    };
    
<<<<<<< HEAD
    this.generateTicket = this.generateTicket.bind(this);
    this.claimVP = this.claimVP.bind(this);
=======
    this.generateCredential = this.generateCredential.bind(this);
    this.claimVP = this.claimVP.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.endTutorial = this.endTutorial.bind(this);
>>>>>>> development
  }

  async componentDidMount() {
      await this.initiateSocket();
      const {state} = this.props.location;
      if(state && state.id_token){
        const decodedIdToken = utils.decodeJWT(state.id_token);
        const jwt = decodedIdToken.jwt;
        if(jwt){
            const presentation: PresentationPayload = utils.decodeJWT(jwt);
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
<<<<<<< HEAD
          
=======
>>>>>>> development
        }

      }
      if(state && state.did){
<<<<<<< HEAD
        this.generateTicket();
=======
>>>>>>> development
        this.setState({
          did: this.props.location.state.did,
          type: this.props.location.state.type,
          data: this.props.location.state.data,
<<<<<<< HEAD
          vaccinePresented: true,
=======
          largeFamily: true,
>>>>>>> development
        });

      }
  }

  async initiateSocket() {
    console.log("in socket");
    const socket = io(config.BACKEND_WS, {
      path: "/airlinews",
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("connect");
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
      console.log("receive");
<<<<<<< HEAD
      this.generateTicket();
      this.setState({
        vaccinePresented: true,
      });
=======
      this.setState({
        largeFamily: true,
      });
      if (sessionStorage.getItem("tutorial")) {
        this.openModal();
      }
>>>>>>> development
    });
  }

  /**
   * VIDCHAIN API REQUEST: Generate Verifiable Credential
   * An authentication token is requested and it is used to request the generation of a verifiableCredential
   */
<<<<<<< HEAD
  async generateTicket() {
=======
  async generateCredential() {
>>>>>>> development
    this.setState({
      studentCard: true,
    });
    const token = await vidchain.getAuthzToken();

    let subject: ICredentialSubject = {
      id: this.state.did,
<<<<<<< HEAD
      from: "Barcelona-El Prat",
      to: "Paris Beauvais",
      date: "Tomorrow at 10:30",
      seat: "23C"
    };

    let credential: ICredentialData = {
      type: ["VerifiableCredential", "TicketFlight"],
=======
      university: "ACME University - Computer Science Department",
      degree: "Bachelor in Software Engineering",
    };

    let credential: ICredentialData = {
      type: ["VerifiableCredential", "UniversityStudentCard"],
>>>>>>> development
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
<<<<<<< HEAD
      vaccineRequested: true,
=======
      discountRequested: true,
>>>>>>> development
    });
    let redirectUri = "";
    if(utils.isMobileOrTablet()){
      const sessionId = utils.randomString(8);
<<<<<<< HEAD
      redirectUri = config.APP_URL + "/presentation?sessionId="+sessionId+"&did="+did+"&type=VaccinationCertificate";
=======
      redirectUri = config.APP_URL + "/presentation?sessionId="+sessionId+"&did="+did+"&type=LargeFamilyCard";
>>>>>>> development
      const body = {
        did,
        sessionId,
      }
      await airlineBackend.createSession(body);
    }
<<<<<<< HEAD
    airlineBackend.claimVP(did, "VaccinationCertificate", redirectUri);
=======
    airlineBackend.claimVP(did, "LargeFamilyCard", redirectUri);
  }

  openModal = () => this.setState({ popUpisOpen: true });
  closeModal = () => {
    this.setState({ popUpisOpen: false });
    
  };

  endTutorial = () => {
    sessionStorage.setItem("step", String(4));
    window.location.replace("/demo/tutorial?step=4");
>>>>>>> development
  }

  render() {
    const {
      did,
      verifiableKYC,
<<<<<<< HEAD
      vaccinePresented,
      vaccineRequested,
=======
      studentCard,
      largeFamily,
      discountRequested,
      popUpisOpen
>>>>>>> development
    } = this.state;
    return (
      <Grid container 
        direction="column"
        justify="space-between"
        alignItems="baseline"
        className="profileHome">

        <Grid item>
           <Header />
        </Grid>
        
        <Grid item className="titleProfile">
          <Typography variant="h2">{"Welcome to your\nAirline Portal"}</Typography>
          {/* <Typography variant="h1">{'Freedonia Citizen Portal'}</Typography> */}
<<<<<<< HEAD
=======
          <Typography variant="h5">Here you can check your profile details and manage your activity within the Airline</Typography>
>>>>>>> development
        </Grid>
        <Grid container
          direction="column"
          justify="space-between"
          alignItems="center" 
          className="panels">
<<<<<<< HEAD

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
=======
            
            <ServicePanel 
              title="Enroled courses"
              subtitle1="Name"
              description1="Bachelor's in Software Engineering"
              subtitle2="Description"
              description2={"The bachelor's degree in Software Engineering provides the knowledge needed to conceive, develop,"+
              "mantain and manage computer systems, services, applications and architectures and to understand and apply relevant legislation."+
              "You will also become an expert in new methods and technologies in the field of ICTs."}
              subtitle3="Institution"
              description3="ACME University - Computer Science Department"
              icon={iconCourse}
              hasBeenValidated={false}
              hasBeenRequested={false} />

          <ServicePanel 
              title="Your Profile"
              subtitle1="Course details"
              description1={"The bachelor's degree in Software Engineering provides the knowledge needed to conceive, design, develop, mantain and"+
              "manage computer sysyems, services, applications and architectures and to understand and apply relevant legislation."+
              "You will also become an expert in new methods and technologies in the ffield of ICTs"}
              subtitle2="DID"
              description2={did}
              subtitle3="Name"
              description3={verifiableKYC.surname ? (verifiableKYC.name + " " + verifiableKYC.surname) : verifiableKYC.name}
              icon={iconProfile}
              textButton="Get Student card credential"
              functionClickButton={this.generateCredential}
              hasBeenValidated={false}
              hasBeenRequested={studentCard} />

          <ServicePanel 
              title="Request your Large Family credential"
              subtitle1="Description"
              description1={"Our university is commited to provide opportunities to everyone. Therefore, this university"+
              "iis eager to support Large Families and for that reason, all the students who are titled Large Family"+
              "will have a 25% discount in student's fees. Do not miss the opportunnity to present your credentials before finishing the course."}
              subtitle2="Requirements"
              description2={"In order to get this discount in your students fees, you will have to prove you are in a Large Family."}
              credentialName="Present your Large Family Card Credential"
              icon={iconLargeFamily}
              textButton="Apply for a discount"
              functionClickButton={this.claimVP}
              hasBeenValidated={largeFamily}
              hasBeenRequested={discountRequested} />

            <Dialog
              open={popUpisOpen}
              onClose={this.closeModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Good Job!"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                You have completed this step successfully.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.endTutorial} color="primary" autoFocus>
                Go back to tutorial
                </Button>
              </DialogActions>
            </Dialog>
>>>>>>> development
          </Grid>
      </Grid>
    );
  }
}

export default Profile;
