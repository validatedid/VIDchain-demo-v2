import React, { Component } from "react";
import {Typography, Grid, Dialog, DialogActions, DialogTitle, DialogContent, Button, DialogContentText} from '@material-ui/core';
import Header from "../../components/Header/Header";
import "./Profile.css";
import * as utils from "../../utils/utils";
import * as agbarBackend from "../../apis/agbarBackend";
import * as vidchain from "../../apis/vidchain";
import io from "socket.io-client";
import { ICredentialDataNew } from "../../interfaces/dtos";
import { ICredentialData } from "../../interfaces/ICredentialData";
import { ICredentialSubject } from "../../interfaces/ICredentialSubject";
import * as config from "../../config";
import { verifiableKYC } from "../../interfaces/dtos";
import { PresentationPayload, VerifiableCredential } from "../../interfaces/IPresentation";
import ServicePanel from "../../components/ServicePanel/ServicePanel";

import iconCourse from "../../assets/images/iconCourse.svg";
import iconLargeFamily from "../../assets/images/iconLargeFamily.svg";
import iconProfile from "../../assets/images/iconProfile.svg";
import iconBank from "../../assets/images/bank.png";
import iconSeal from "../../assets/images/seal_check.png";

//imports
import { VidchainClient } from "../../libs/openid-connect/vidchainClient";


interface Props {
  did: string;
  jwt: string;
  history?: any;
  location: any;
}

interface State {
  did: string;
  verifiableKYC: verifiableKYC;
  largeFamily: boolean;
  discountRequested: boolean;
  studentCard: boolean;
  socketSession: string;
  type: string;
  data: any;
  popUpisOpen: boolean;
  accountName:string;
  bic:string;
  iban:string;
}

class Profile extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    const {state} = this.props.location;
    this.state = {
      did: state ? utils.getUserDid(state.id_token) : '',
      accountName: '',
      bic: '',
      iban:'',
      largeFamily: false,
      discountRequested: false,
      studentCard: false,
      socketSession: "",
      verifiableKYC: {} as verifiableKYC,
      type: "",
      data: {},
      popUpisOpen: false
    };
    
    this.generateCredential = this.generateCredential.bind(this);
    this.claimVP = this.claimVP.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.endTutorial = this.endTutorial.bind(this);
  }

  async componentDidMount() {
    console.log('profile - componentDidMount');
    
      await this.initiateSocket();
      const {state} = this.props.location;
      console.log('profile - state');
      console.log(state);
      
      if(state && state.id_token){
        const presentation: PresentationPayload = utils.decodeJWT(state.id_token);
        console.log('presentation');
        console.log(presentation);

        let credentialVerifiableID: any = presentation.vp.verifiableCredential[0];
        let credentialBankData: any =  presentation.vp.verifiableCredential[1];
        
        let credentialSubjectBankData: any = credentialBankData.credentialSubject;
        let credentialSubjectVerifiableId: any = credentialVerifiableID.credentialSubject;


        this.setState({
          accountName: credentialSubjectBankData.name,
          bic: credentialSubjectBankData.bic,
          iban: credentialSubjectBankData.iban,
        });
      }
 

  }

  async initiateSocket() {
    // console.log("profile - in socket");
    // const socket = io(config.BACKEND_WS, {
    //   path: "/agbarws",
    //   transports: ["websocket"],
    // });

    // socket.on("connect", () => {
    //   console.log("connect");
    //   this.setState({
    //     socketSession: socket.id,
    //   });
    //   const socketClient = {
    //     did: this.state.did,
    //     clientId: this.state.socketSession,
    //   };
    //   if(socketClient.clientId && socketClient.did && socketClient.clientId !== "" && socketClient.did !== ""){
    //     console.log(`FRONT: socketClient.did: ${JSON.stringify(socketClient.did)}`);
    //     console.log(`FRONT: socketClient.clientId: ${JSON.stringify(socketClient.clientId)}`);
    //     socket.emit("whoami", socketClient);
    //   }
    // });

    // socket.on("largeFamilyPresentation", (msg: any) => {
    //   console.log("receive");
    //   this.setState({
    //     largeFamily: true,
    //   });
    //   if (sessionStorage.getItem("tutorial")) {
    //     this.openModal();
    //   }
    // });
  }

  /**
   * VIDCHAIN API REQUEST: Generate Verifiable Credential
   * An authentication token is requested and it is used to request the generation of a verifiableCredential
   */
  async generateCredential() {
    this.loginUserWithVIDChain();

    this.setState({
      studentCard: true,
    });
    const token = await vidchain.getAuthzToken();

    console.log('token');
    console.log(token);
    

    let subject: ICredentialSubject = {
      id: 'id_demo_agbar',//this.state.did,
      entity: "Aigües de Barcelona",
      title: "Good Payer",
    };

    let credential: ICredentialData = {
      type: ["VerifiableCredential", "GoodPayerCard"],
      issuer: utils.getIssuerDid(token),
      id: '',//did is needed,//this.state.did,
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
      discountRequested: true,
    });
    let redirectUri = "";
    if(utils.isMobileOrTablet()){
      const sessionId = utils.randomString(8);
      redirectUri = config.APP_URL + "/presentation?sessionId="+sessionId+"&did="+did+"&type=LargeFamilyCard";
      const body = {
        did,
        sessionId,
      }
      await agbarBackend.createSession(body);
    }
    agbarBackend.claimVP(did, "LargeFamilyCard", redirectUri);
  }

  openModal = () => this.setState({ popUpisOpen: true });
  closeModal = () => {
    this.setState({ popUpisOpen: false });
    
  };

  endTutorial = () => {
    sessionStorage.setItem("step", String(4));
    window.location.replace("/demo/tutorial?step=4");
  }

  // Methods
  async loginWithVIDChain() {
    var client = VidchainClient.getInstance().getClient();
    await client.callback();
    await client.getToken({
      scopes: {
        request: ["openid", "VerifiableIdCredential", "BankAccountHolderCredential"]
      },
    });
  }

  async loginUserWithVIDChain() {
    var client = VidchainClient.getInstance().getClient();
    await client.callback();
    await client.getToken({
      scopes: {
        request: ["openid", "VerifiableIdCredential"]
      },
    });
  }

  render() {
    const {
      did,
      verifiableKYC,
      studentCard,
      largeFamily,
      discountRequested,
      popUpisOpen,
      accountName,
      bic,
      iban
    } = this.state;
    return (
      <div>
        <Header />

      <Grid container 
        direction="column"
        justify="space-between"
        alignItems="baseline"
        className="profileHome">

        
        <Grid item className="titleProfile">
          <div className="titleStruct">
          <Typography id="wellcome"  variant="h2">{"Welcome"}</Typography>
          <Typography id="userName" variant="h2">{"Alice"}</Typography>
          </div>
          <Typography variant="h5">Here you can check your profile details and manage your payment methods</Typography>
        </Grid>
        <Grid container
          direction="column"
          justify="space-between"
          alignItems="center" 
          className="panels">
            
            {/* <ServicePanel 
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
              hasBeenRequested={false} /> */}

          


          <ServicePanel 
              title="Banking details"
              subtitle1="The bank account selected will be used for the next invoice"
              description1={accountName ? accountName: 'Freedonia Current Account'}
              subtitle2="BIC"
              description2={bic ? bic: 'FREECAMMXXX'}
              subtitle3="IBAN"
              description3={iban ? iban: 'ES9434890120376846303745'}
              icon={iconBank}
              textButton="Choose bank account"
              functionClickButton={this.loginWithVIDChain}
              hasBeenValidated={false}
              hasBeenRequested={studentCard} />


          <ServicePanel 
              title="Seal of Good Payer"
              subtitle1="Seal details"
              description1={"You can request a credential to certificat that you are a Good Payer"}
              subtitle2="Request your credential"
              description2=""
              subtitle3=""
              description3={verifiableKYC.surname ? (verifiableKYC.name + " " + verifiableKYC.surname) : verifiableKYC.name}
              icon={iconSeal}
              textButton="Good Payer credential"
              functionClickButton={this.generateCredential}
              hasBeenValidated={false}
              hasBeenRequested={studentCard} />


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
          </Grid>
      </Grid>
    </div>);
  }
}

export default Profile;
