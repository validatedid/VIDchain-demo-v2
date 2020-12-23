import React, { Component } from "react";
import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import Footer from "../../components/Footer/Footer";
import "./Profile.css";
import * as utils from "../../utils/utils";
import * as universityBackend from "../../apis/universityBackend";
import * as vidchain from "../../apis/vidchain";
import io from "socket.io-client";
import { Button } from "react-bootstrap";
import { ICredentialData } from "../../interfaces/ICredentialData";
import { ICredentialSubject } from "../../interfaces/ICredentialSubject";
import * as config from "../../config";
import { verifiableKYC } from "../../interfaces/dtos";
import { PresentationPayload, VerifiableCredential } from "../../interfaces/IPresentation";
import { Modal } from "react-bootstrap";

interface Props {
  did: string;
  jwt: string;
  history?: any;
  location: any;
}

interface State {
  access_token: string;
  refresh_token: string;
  id_token: string;
  did: string;
  verifiableKYC: verifiableKYC;
  largeFamily: boolean;
  discountRequested: boolean;
  studentCard: boolean;
  socketSession: string;
  type: string;
  data: any;
  popUpisOpen: boolean;
}

class Profile extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      access_token: "",
      refresh_token: "",
      id_token: "",
      did: utils.getUserDid(this.props.location.state.id_token),
      largeFamily: false,
      discountRequested: false,
      studentCard: false,
      socketSession: "",
      verifiableKYC: {} as verifiableKYC,
      type: "",
      data: {},
      popUpisOpen: false,
    };
    this.initiateSocket();
  }

  componentDidMount() {
      if(this.props.location.state.id_token){
        const decodedIdToken = utils.decodeJWT(this.props.location.state.id_token);
        const jwt = decodedIdToken.jwt;
        if(jwt){
            const presentation: PresentationPayload = utils.decodeJWT(jwt);
            const credential: VerifiableCredential = presentation.vp.verifiableCredential[0] as VerifiableCredential;
            console.log(JSON.stringify(credential));
            this.setState({
              verifiableKYC: {
                id: credential.credentialSubject.id as string,
                documentNumber: credential.credentialSubject.documentNumber as string,
                documentType: credential.credentialSubject.documentType as string,
                name: credential.credentialSubject.firstName as string,
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
        // this.setState({
        //   access_token: this.props.location.state.access_token,
        //   refresh_token: this.props.location.state.refresh_token,
        //   id_token: this.props.location.state.id_token,
        //   did: utils.getUserDid(this.props.location.state.id_token),
        //   verifiableKYC: this.props.location.state.verifiableKYC,
        // });
      }
      if(this.props.location.state.did){
        this.setState({
          did: this.props.location.state.did,
          type: this.props.location.state.type,
          data: this.props.location.state.data,
        });
        console.log(this.state.type);
        console.log(this.state.data);

      }
  }

  async initiateSocket() {
    const socket = io(config.BACKEND_WS, {
      path: "/universityws",
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
      this.setState({
        largeFamily: true,
        popUpisOpen:true
      });
      this.openModal();
    });
  }

  /**
   * VIDCHAIN API REQUEST: Generate Verifiable Credential
   * An authentication token is requested and it is used to request the generation of a verifiableCredential
   */
  async generateCredential() {
    this.setState({
      studentCard: true,
    });
    const token = await vidchain.getAuthzToken();

    let subject: ICredentialSubject = {
      id: this.state.did,
      university: "ACME University - Computer Science Department",
      degree: "Bachelor in Software Engineering",
    };

    let credential: ICredentialData = {
      type: ["VerifiableCredential", "UniversityStudentCard"],
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
      await universityBackend.createSession(body);
    }
    universityBackend.claimVP(did, "LargeFamilyCard", redirectUri);
  }

  openModal = () => this.setState({ popUpisOpen: true });
  closeModal = () => {
    this.setState({ popUpisOpen: false });
    window.location.replace("/tutorial?step=4");
  };

  render() {
    const {
      did,
      verifiableKYC,
      studentCard,
      largeFamily,
      discountRequested,
    } = this.state;
    return (
      <div>
        <HeaderLogin></HeaderLogin>
        <div className="fullContent">
          <section id="inner-headline">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h2 className="pageTitle">Your Student Portal</h2>
                </div>
              </div>
            </div>
          </section>
          <section id="content">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="about-logo">
                    <h3>Welcome to your Student Portal</h3>
                    <p>
                      Here you can check your profile details and manage your
                      activity within the university.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="wrapper">
                  <div className="inner">
                    <div className="image-holder">
                      <img
                        className="imageSoftware"
                        src={require("../../assets/images/software_engineer.png")}
                        alt=""
                      />
                    </div>
                    <form action="">
                      <div className="form-row">
                        <h4>
                          <b>Enroled courses</b>
                        </h4>
                      </div>
                      <br />
                      <div className="form-row">
                        <h4>Name</h4>
                        <p>Bachelor's in Software Engineering</p>
                      </div>
                      <br></br>
                      <div className="form-row">
                        <h4>Description</h4>
                        <p>
                          The bachelor’s degree in Software Engineering provides
                          the knowledge needed to conceive, design, develop,
                          maintain and manage computer systems, services,
                          applications and architectures and to understand and
                          apply relevant legislation. You will also become an
                          expert in new methods and technologies in the field of
                          ICTs.{" "}
                        </p>
                      </div>
                      <br />
                      <div className="form-row">
                        <h4>Institution</h4>
                        <p>ACME University - Computer Science Department</p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="row"></div>
              <div className="row">
                <div className="wrapper">
                  <div className="inner">
                    <div className="image-holder">
                      <img
                        className="imageStudent"
                        src={require("../../assets/images/studentlogo.png")}
                        alt=""
                      />
                    </div>
                    <form action="">
                      <div className="form-row">
                        <h4>
                          <b>Your Profile</b>
                        </h4>
                      </div>
                      <br />
                      <div className="form-row">
                        <h4>Course details - remove adjust</h4>
                        <p>
                          The bachelor’s degree in Software Engineering provides
                          the knowledge needed to conceive, design, develop,
                          maintain and manage computer systems, services,
                          applications and architectures and to understand and
                          apply relevant legislation. You will also become an
                          expert in new methods and technologies in the field of
                          ICTs.{" "}
                        </p>
                      </div>
                      <div className="form-row">
                        <h4>DID</h4>
                        <p>{did}</p>
                      </div>
                      <div className="form-row">
                        <h4>Name:</h4>
                        <p>
                          {verifiableKYC.name}&nbsp;{verifiableKYC.surname}
                        </p>
                      </div>
                      <div className="form-row">
                        <h4>Birth:</h4>
                        <p>
                          {verifiableKYC.dateOfBirth}&nbsp;-&nbsp;{verifiableKYC.placeOfBirth}
                        </p>
                      </div>
                      <div className="form-row">
                        <h4>Nationality:</h4>
                        <p>{verifiableKYC.nationality}</p>
                      </div>
                      <div className="form-row">
                        <h4>Document:</h4>
                        <p>
                          {verifiableKYC.documentType}:&nbsp;{verifiableKYC.documentNumber}
                        </p>
                      </div>
                      {!studentCard && (
                        <Button
                          type="button"
                          className="collect-button"
                          onClick={() => this.generateCredential()}
                        >
                          <b>Get student card credential</b>
                        </Button>
                      )}
                      <br></br>
                      {studentCard && (
                        <h2 style={{ color: "#00cc00" }}>
                          {" "}
                          Credential generated, please check your wallet.{" "}
                        </h2>
                      )}
                    </form>
                  </div>
                </div>
              </div>
              <div className="row"></div>
              <div className="row">
                <div className="wrapper">
                  <div className="inner">
                    <div className="image-holder">
                      <img
                        className="imageFamily"
                        src={require("../../assets/images/familiar.svg")}
                        alt=""
                      />
                    </div>
                    <form action="">
                      <div className="form-row">
                        <h4>
                          <b>
                            Large family? Get a discount on your student fee!
                          </b>
                        </h4>
                      </div>
                      <br />
                      <div className="form-row">
                        <h4>Description</h4>
                        <p>
                          Our university is commited to provide opportunities to
                          everyone. Therefore, this university is eager to
                          support Large Families and for that reason, all the
                          students who are titled Large Family will have a 25%
                          discount in student's fees. Do not miss the
                          opportunity to present your credentials before
                          finishing the course.{" "}
                        </p>
                      </div>
                      <br />
                      <div className="form-row">
                        <h4>Requirements</h4>
                        <p>
                          In order to get this discount in your students fees,
                          you will have to prove you are in a Large Family.{" "}
                        </p>
                        <p>
                          <b>Present your Large Family Card Credential</b>{" "}
                          issued by Government of Freedonia.
                        </p>
                      </div>
                      <br />
                      <br></br>
                      {!largeFamily && !discountRequested && (
                        <Button
                          type="button"
                          className="collect-button"
                          onClick={() => this.claimVP()}
                        >
                          <b>Apply for a discount</b>
                        </Button>
                      )}
                      {!largeFamily && discountRequested && (
                        <h3 style={{ color: "#0c4270" }}>
                          {" "}
                          Pending to receive Large Family Credential...{" "}
                        </h3>
                      )}
                      {largeFamily && (
                        <h2 style={{ color: "#00cc00" }}>
                          {" "}
                          Accepted request. Discount applied.{" "}
                        </h2>
                      )}
                      <Modal show={this.state.popUpisOpen} onHide={this.closeModal} style={{opacity:1}}>
                      <Modal.Header closeButton>
                        <Modal.Title>Good Job!</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>You have completed this step successfully.</Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                          Go back to tutorial
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Profile;
