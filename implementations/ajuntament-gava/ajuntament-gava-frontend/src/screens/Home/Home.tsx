import React, { Component } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from "../../components/Official/Official";
import { OpenIDClient } from "../../libs/openid-connect/client";
import { Form, Button } from "react-bootstrap";

interface Props {
  history?: any;
}

interface State {
  name: string;
}

class Home extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
    };
  }

  componentDidMount() {
    var client = OpenIDClient.getInstance().getClient();
    client.wipeTokens();
    localStorage.clear();
    sessionStorage.clear();
  }

  async loginWithValid() {
    var client = OpenIDClient.getInstance().getClient();
    await client.callback();
    await client.getToken();
  }

  request(){
    this.props.history.push({
      pathname: "/request"
    });
  }


  render() {
    return (
      <div className="page">
        <Official></Official>
        <Header></Header>
        <main id="contenedorWebapps">
              <div id="bienvenida">
                <br/><br/><br/>
                  <h3>Online access to your City Council with full guarantees</h3>
                  <div className="sign_in_vidchain">
                    <a
                      className="btn btn-default"
                      href="#"
                      role="button"
                      onClick={() => this.loginWithValid()}
                    >
                      <i className="fa fa-check-square-o"></i>Open MyGov
                    </a>
                  </div>
                  <p>The City Council's e-Office is the e-mail address available to citizens, through telecommunications networks, through which the City Council disseminates information and provides services.</p>
                  <p>Ownership of the Electronic Office entails responsibility for the integrity, veracity and updating of information and services by the City Council.<br/><br/><span >NOTICE:</span><br/><br/>Municipal services are fully active through telephone support and electronic registration (https://eseu.gava.cat). While tele-work continues to be encouraged, face-to-face care can be received by prior appointment.<br/><br/><strong>Priority is given to telephone and electronic attention. In cases where it is essential, and after assessment by municipal staff, is attended in person &nbsp;<span>ALWAYS BY APPOINTMENT</span>.</strong><br/><br/>If you want us to call you to carry out this assessment or to make an inquiry about specific procedures<span><a href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_CITAPREVIA">request an appointment to be attended to by telephone</a></span>&nbsp; whenever fits you.<br/><br/>In order to contact OAC or make an appointment, call 93 263 91 00 or call 900 66 33 88 from Monday to Friday from 9 am to 2.30 pm.&nbsp;
                      <span><a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_CITAPREVIAOAC">Request an appointment to be attended in person</a></span><br/><br/>You can also contact the City Council via email at ajuntament@gava.cat or via the Internet at the electronic office https://eseu.gava.cat.</p>
              </div>
              <div className="mod_ppal_sede sedeLeft">
                  <div id="colJSede">
                      <div id="menufoto2Sede"><img src={require("../../assets/images/3_24_1.jpg")} alt=""/></div>
                  </div>
                  <ul className="estiloFlecha">
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_QUEESLASEDE">What is online service</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_ORDENANZAAE">Electronic administration ordinance</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_TITULARSEDE">Holder of the Electronic Office</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_CARTA">Electronic service catalog</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_CARTASERVICIOS">Service catalog</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_FIRMASELEC">Certificates and electronic signature systems</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_AYUDA">Help</a><br/>
                  </ul>
              </div>
              <div className="mod_ppal_sede sedeLeft">
                  <div id="colJSede">
                      <div id="menufoto2Sede"><img src={require("../../assets/images/0_25_1.jpg")} alt="" /></div>
                  </div>
                  <ul className="estiloFlecha">
                      <a title="" href='javascript:void(0)' onClick={() => this.request()}>Submission of new applications</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_REUDOCS">Submission of commonly requested documents</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_EXPEDOCUMENTS">Certifications and receipts</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_EXPEDIENTES">Consultation and monitoring of your files</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_DATOSPERS">Consultation of your personal data</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_TRIBUTOS">Taxes and payments</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_NOTIFICACIONES">Access to the notification mailbox</a><br/>
                  </ul>
              </div>
              <div className="mod_ppal_sede sedeLeft">
                  <div id="colJSede">
                      <div id="menufoto2Sede"><img src={require("../../assets/images/0_26_1.jpg" )} alt=""/></div>
                  </div>
                  <ul className="estiloFlecha">
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_CATSERV">Catalog of procedures</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_EMPLEODESC">Public employment offer</a><br/>
                      <a title="" href="https://tauler.seu.cat/inici.do?idens=808980001" target="_blank">Electronic bulletin board and edicts</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_NORMATIVA">Municipal ordinances and regulations</a><br/>
                      <a title="" href="https://contractaciopublica.gencat.cat/ecofin_pscp/AppJava/perfil/gava/es_ES/customProf" target="_blank">Contractor profile</a><br/>
                      <a title="" href="https://licitacions.gava.cat" target="_blank">PIXELWARE electronic bidding platform</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_PLENODESC">Meeting minutes</a><br/>
                      <a href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_JUNTADESC">Minutes of the Local Government Board</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_OFIASIREG">Registration Assistance Offices</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_VALDOCUMENTS">Document verification</a><br/>
                  </ul>
                    </div>
                    <div className="clear"></div>
                </main>
        {/* <div className="content">
          <div className="login_form">
            <h4 className="mt-0">Access services</h4>
            <br />
            <p>
              You can manage all the city services from this website:
              subscriptions, taxes...
            </p>
            <div className="sign_in_vidchain">
              <a
                className="btn btn-default"
                href="#"
                role="button"
                onClick={() => this.loginWithValid()}
              >
                <i className="fa fa-check-square-o"></i>Sign in with Valid
              </a>
            </div>
            <div>
              <p>or</p>
              <Form className="login_manual_form">
                <div className="form-group">
                  <i className="fa fa-user"></i>
                  <Form.Control
                    placeholder="Username"
                    onChange={(event: any) =>
                      this.setState({ name: event.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                  <Form.Control type="password" placeholder="Password" />
                </div>
                <Button
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div> */}
        <div className="footer">
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default Home;
