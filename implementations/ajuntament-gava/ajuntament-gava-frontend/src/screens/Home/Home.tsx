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
        <main id="contenedorWebapps" className="contendorHome">
              <div id="bienvenida">
                  <h3>L'accés electrònic al vostre Ajuntament amb plenes garanties</h3>
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
                  <p>La Seu electrònica de l'Ajuntament és l'adreça electrònica disponible per als ciutadans i les ciutadanes, a través de xarxes de telecomunicacions, mitjançant la qual l'Ajuntament difon informació
                      i presta serveis.</p>
                  <p>La titularitat de la Seu electrònica comporta la responsabilitat respecte a la integritat, veracitat i actualització de la informació i els serveis per part de l'Ajuntament.<br/><br/><span >AVÍS IMPORTANT:</span><br/><br/>Els
                      serveis municipals estan plenament actius a través de l’atenció telefònica i el registre electrònic (https://eseu.gava.cat). Si bé es continua fomentant el tele-treball, es pot rebre atenció
                      presencial, demanant cita prèvia.<br/><br/><strong>Es prioritza l'atenció telefònica i electrònica. En els casos en que sigui imprescindible, i prèvia valoració per part de personal municipal, s'atén presencialment, però&nbsp;<span>SEMPRE AMB CITA PRÈVIA</span>.</strong><br/><br/>Si
                      vols que et truquem per realitzar aquesta valoració o per fer una consulta sobre tràmits específics <span><a href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_CITAPREVIA">demana cita per ser atès telefònicament</a></span>&nbsp;a
                      l'hora que triïs.<br/><br/>Per contactar amb l’Oficina d’Atenció Ciutadana o demanar cita prèvia, cal trucar al 93 263 91 00 o al telèfon gratuït 900 66 33 88 de dilluns a divendres de 9 a 14.30h.&nbsp;
                      <span><a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_CITAPREVIAOAC">Demana cita per ser atès presencialment</a></span><br/><br/>També es pot
                          contactar amb l’Ajuntament a través de correu electrònic a ajuntament@gava.cat o mitjançant Internet a la seu electrònica https://eseu.gava.cat.</p>
              </div>
              <div className="mod_ppal_sede">
                  <div id="colJSede">
                      <div id="menufoto2Sede"><img src={require("../../assets/images/3_24_1.jpg")} alt=""/></div>
                  </div>
                  <ul className="estiloFlecha">
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_QUEESLASEDE">Què és la seu electrònica</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_ORDENANZAAE">Ordenança d'administració electrònica</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_TITULARSEDE">Titular de la Seu electrònica</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_CARTA">Carta de serveis electrònics</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_CARTASERVICIOS">Carta de serveis</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_FIRMASELEC">Certificats i sistemes de signatura electrònica</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_AYUDA">Ajuda a la seu</a><br/>
                  </ul>
              </div>
              <div className="mod_ppal_sede">
                  <div id="colJSede">
                      <div id="menufoto2Sede"><img src={require("../../assets/images/0_25_1.jpg")} alt="" /></div>
                  </div>
                  <ul className="estiloFlecha">
                      <a title="" href='javascript:void(0)' onClick={() => this.request()}>Presentació de noves sol·licituds</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_REUDOCS">Presentació de documents habitualment sol·licitats</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_EXPEDOCUMENTS">Certificacions i justificants</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_EXPEDIENTES">Consulta i seguiment dels seus expedients</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_DATOSPERS">Consulta de les seves dades personals</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_TRIBUTOS">Tributs i pagaments</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_NOTIFICACIONES">Accés a la bústia de notificacions</a><br/>
                  </ul>
              </div>
              <div className="mod_ppal_sede">
                  <div id="colJSede">
                      <div id="menufoto2Sede"><img src={require("../../assets/images/0_26_1.jpg" )} alt=""/></div>
                  </div>
                  <ul className="estiloFlecha">
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_CATSERV">Catàleg de tràmits</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_EMPLEODESC">Oferta pública d'ocupació </a><br/>
                      <a title="" href="https://tauler.seu.cat/inici.do?idens=808980001" target="_blank">Tauler d'anuncis i edictes electrònics</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_NORMATIVA">Ordenances i reglaments municipals</a><br/>
                      <a title="" href="https://contractaciopublica.gencat.cat/ecofin_pscp/AppJava/perfil/gava/es_ES/customProf" target="_blank">Perfil del contractant</a><br/>
                      <a title="" href="https://licitacions.gava.cat" target="_blank">Plataforma de licitació electrònica PIXELWARE</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_PLENODESC">Actes de ple</a><br/>
                      <a href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_JUNTADESC">Actes de Junta de Govern Local</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_OFIASIREG">Oficines d'Assistència de Registre</a><br/>
                      <a title="" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_VALDOCUMENTS">Verificació de documents</a><br/>
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
