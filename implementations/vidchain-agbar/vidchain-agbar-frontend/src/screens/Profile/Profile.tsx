import React, { Component, Fragment } from "react";
import {Typography, Grid} from '@material-ui/core';
import Header from "../../components/Header/Header";
import "./Profile.css";
import * as utils from "../../utils/utils";
import * as vidchain from "../../apis/vidchain";
import { ICredentialData } from "../../interfaces/ICredentialData";
import { ICredentialSubject } from "../../interfaces/ICredentialSubject";
import { PresentationPayload, VerifiableCredential } from "../../interfaces/IPresentation";
import ServicePanel, {ServicePanel2} from "../../components/ServicePanel/ServicePanel";
import iconBank from "../../assets/images/bank.png";
import iconSeal from "../../assets/images/seal_check.png";
import { VidchainClient } from "../../libs/openid-connect/vidchainClient";


interface Props {
  did: string;
  jwt: string;
  history?: any;
  location: any;
}

interface State {
  did: string;
  largeFamily: boolean;
  discountRequested: boolean;
  goodPayerCard: boolean;
  socketSession: string;
  type: string;
  data: any;
  accountName:string;
  bic:string;
  iban:string;
  logged:boolean;
}

class Profile extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    const {state} = this.props.location;
    this.state = {
      did: '',//state ? utils.getUserDid(state.id_token) : '',
      accountName: '',
      bic: '',
      iban:'',
      largeFamily: false,
      discountRequested: false,
      goodPayerCard: false,
      socketSession: "",
      type: "",
      data: {},
      logged:false
    };

    this.generateCredential = this.generateCredential.bind(this);
    this.loginUserWithVIDChain = this.loginUserWithVIDChain.bind(this);
  }

  async componentDidMount() {
      const {state} = this.props.location;

      
      if(state && state.id_token){
        const presentation: PresentationPayload = utils.decodeJWT(state.id_token);

        if (presentation.vp.verifiableCredential && presentation.vp.verifiableCredential.length > 1){
          let credentialVerifiableID: any = presentation.vp.verifiableCredential[0];
          let credentialBankData: any =  presentation.vp.verifiableCredential[1];
          
          let credentialSubjectBankData: any = credentialBankData.credentialSubject;

          window.localStorage.setItem('accountName', credentialSubjectBankData.name);
          window.localStorage.setItem('bic', credentialSubjectBankData.bic);
          window.localStorage.setItem('iban', credentialSubjectBankData.iban);
        }else{
          window.localStorage.setItem('did', presentation.did);
        }
         this.setState({
            accountName: window.localStorage.getItem('accountName') || 'Freedonia Current Account',
            bic: window.localStorage.getItem('bic') || 'FREECAMMXXX',
            iban: window.localStorage.getItem('iban') || 'ES9434890120376846303745',
            did: window.localStorage.getItem('did') || '',
            logged: JSON.parse(window.localStorage.getItem('logged') || "false")
          });
      }
  }


  /**
   * VIDCHAIN API REQUEST: Generate Verifiable Credential
   * An authentication token is requested and it is used to request the generation of a verifiableCredential
   */
  async generateCredential() {
    this.setState({
      goodPayerCard: true,
    });
    const token = await vidchain.getAuthzToken();
    let subject: ICredentialSubject = {
      id: this.state.did,
      entity: "Aigües de Barcelona",
      title: "Good Payer",
    };

    let credential: ICredentialData = {
      type: ["VerifiableCredential", "GoodPayerCard"],
      issuer: utils.getIssuerDid(token),
      id: this.state.did,
      credentialSubject: subject,
    };
    const response = await vidchain.generateVerifiableCredential(
      token,
      credential
    );
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
    
    window.localStorage.setItem('logged', 'true');

    var client = VidchainClient.getInstance().getClient();
    await client.callback();
    await client.getToken({
      scopes: {
        request: ["openid"]
      },
    });

    
  }

  render() {
    const {
      did,
      goodPayerCard,
      accountName,
      bic,
      iban,
      logged
    } = this.state;
    return (
      <Fragment>
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
              hasBeenRequested={false} />


          <ServicePanel2
              title="Seal of Good Payer"
              subtitle1="Seal details"
              description1={"You can request a credential to certificate that you are a Good Payer"}
              subtitle2="Login with VIDchain"
              description2=""
              subtitle3="Request your credential"
              description3=""
              icon={iconSeal}
              textButton="Good Payer credential"
              textButtonLogin="Login VIDchain"
              functionLoginClickButton={this.loginUserWithVIDChain}
              functionClickButton={this.generateCredential}
              hasBeenValidated={false}
              logged={logged}
              hasBeenRequested={goodPayerCard}
              subtitle4="Logged with the did" 
              description4={did}
              />
          </Grid>
      </Grid>
    </Fragment>);
  }
}

export default Profile;
