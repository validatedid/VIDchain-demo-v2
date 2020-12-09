import React, { Component } from "react";
import "./Request.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from "../../components/Official/Official";
import { OpenIDClient } from "../../libs/openid-connect/client";
import { VidchainClient } from "../../libs/openid-connect/vidchainClient";


interface Props {
  history?: any;
}

interface State {
  name: string;
}

class Request extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
    };
  }

  componentDidMount() {
    var clientValid = OpenIDClient.getInstance().getClient();
    var client = VidchainClient.getInstance().getClient();
    clientValid.wipeTokens();
    client.wipeTokens();
    localStorage.clear();
    sessionStorage.clear();
  }

  submit(){
      console.log("submit");
  }

  async loginWithValid() {
    var client = OpenIDClient.getInstance().getClient();
    await client.callback();
    await client.getToken();
  }

  async loginWithVIDChain() {
    var client = VidchainClient.getInstance().getClient();
    await client.callback();
    await client.getToken({
      scopes: {
        request: ["openid", "offline"],
        require: ["openid", "offline"],
      },
    });
  }


  render() {
    return (
      <div className="page">
        <Official></Official>
        <Header></Header>
        <div className="content-area ovt_panel widget-area standard detalle">
		
		<h3 className="has-actions">
			<div className="detail-title">Alta al Padró d'Habitants</div>
		</h3>
			<div className="ovt_frame">
				<div className="ovt_contenido ">
					<div className="detalle">
						<div id="informacionTramite">
		<table className="tableInfoDetalle large">
		<caption>datos de la subsección</caption>
			<tbody><tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Finalitat:
				</td>
			<td className="valorAtributo altoPAuto">
				<p>Inscripció al padró municipal d'habitants dels residents al municipi de Gavà</p>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Qui ho pot Presentar:
				</td>
			<td className="valorAtributo altoPAuto">
				<ul><li>Persona interessada</li><li>Representant de l'interessat</li><li>Persona que representa al menor d'edat</li></ul>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Terminis de Presentació:
				</td>
			<td className="valorAtributo altoPAuto">
				<p>Es pot fer tot l'any</p>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Presentació:
				</td>
			<td className="valorAtributo altoPAuto">
				OAC Ajuntament
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Òrgan Gestor:
				</td>
			<td className="valorAtributo altoPAuto">
				Oficina d'Atenció Ciutadana (OAC)
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Termini de resolució:
				</td>
			<td className="valorAtributo altoPAuto">
				<p>L'establert per la llei de procediment administratiu</p>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Efecte del silenci Administratiu:
				</td>
			<td className="valorAtributo altoPAuto">
				Estimatori
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Recursos:
				</td>
			<td className="valorAtributo altoPAuto">
				<p>Alçada i reposició</p>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Normativa bàsica:
				</td>
			<td className="valorAtributo altoPAuto">
				<ul><li>Llei 4/1996, de 10 de gener, per la qual es modifica la Llei 7/1985, de 2 abril, reguladora de Bases del Règim Local,en els seus articles relacionats amb el Padró d'habitants.</li><li>Real Decret 1690/1986, d'11 de juliol, pel que s'aprova el Reglament de Població i Demarcació Territorial de les Entitats Locals.</li><li>Resolució de 16 de març de 2015, de la Subsecretaria, per la que es publica la Resolució de 30 de gener de 2015, de la Presidència de l'INE i de la Direcció General de Coordinació de Competències amb les CCAA i les entitats locals, en relació amb instruccions tècniques als Ajuntaments sobre gestió del padró municipal.</li><li>RD 240/2007 sobre entrada, lliure circulació i residència a España de ciutadans dels Estats membres de la UE i altres Estats part de l'acord sobre l'Espai Econòmic Europeu.</li></ul>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Pagament de taxes:
				</td>
			<td className="valorAtributo altoPAuto">
				No aplica taxa
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Informació Addicional:
				</td>
			<td className="valorAtributo altoPAuto">
				<p><strong>Documentació a adjuntar en cada cas:</strong></p><ul><li>Document acreditatiu de la identitat de tots els majors d'edat que s'empadronin</li><li>Document que acrediti la titularitat de l'habitatge (escriptura de propietat o contracte de lloguer, amb l'últim rebut pagat on han de constar les dades completes per poder identificar el lloguer)</li><li>En cas que s'empadroni en un domicili on ja resideixin altres persones, haurà d'adjuntar autorització del titular de l'habitatge o del contracte de lloguer, i document acreditatiu de la identitat del mateix</li><li><strong>Si s'empadronen menors:</strong></li><li>Llibre de família o partida de naixement, en cas que s'empadronin amb els dos progenitors</li><li>Resolució judicial de custòdia o autorització de laltre progenitor, en cas que el/s menors s'empadronin amb un dels progenitors</li><li>Resolució judicial en cas de tutel·la, acolliment, adopció</li><li><strong>Si s'actúa en representació:</strong></li></ul><ul><li>Autorització de representació signada pel representat</li><li>Còpia del document d'identitat del representat</li></ul><p>Haurá d'informar del nivell de formació de totes les persones que s'empadronen i de l'últim municipi on estan empadronats.</p><p>&nbsp;</p><p></p>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Documentació relacionada:
				</td>
			<td className="valorAtributo altoPAuto columns">
<a target="_blank" href="/sta/docs/GetDocumentServlet?CUD=12656030747455626053&amp;HASH_CUD=bd67c1813b0463de3c74d25953b581a7dec5bca4&amp;APP_CODE=STA" className="link-icon pdfLink">AutoritzacioMenorsDomiciliDiferentProgenitorsPadroHabitants</a> 
<a target="_blank" href="/sta/docs/GetDocumentServlet?CUD=12656030203244117763&amp;HASH_CUD=0dd74b1baa2c1a1b6dc7c0686805dada02f7af71&amp;APP_CODE=STA" className="link-icon pdfLink">AutoritzacioMenorsUnSolProgenitorPadroHabitants</a> 
<a target="_blank" href="/sta/docs/GetDocumentServlet?CUD=13064405731717663214&amp;HASH_CUD=617aa39a5492883342d7801bb323af2c3a4a2de8&amp;APP_CODE=STA" className="link-icon pdfLink">Sol·licitudGenerica</a>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Nivell d'identificació del sol·licitant:
				</td>
			<td className="valorAtributo ">
				<table cellPadding="0" cellSpacing="10">
				<tbody><tr>
					<td className="ancho12" valign="top">
					<b>Alt:</b></td>
					<td valign="top">Certificat digital reconegut i signatura electrònica</td>
				</tr>
				<tr>
					<td className="ancho12">
					<b>Alt:</b></td><td>Amb sistema Vàlid</td>
				</tr>
				</tbody></table>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Documents a Presentar:
				</td>
			<td className="valorAtributo ">
	<table><tbody><tr><td><strong>Documentació requerida</strong></td></tr><tr> <td>- Autorització titular habitatge padró habitants</td></tr><tr> <td>- Autorització de representació</td></tr><tr> <td>- Autorització menors amb un sol progenitor padró d'habitants</td></tr><tr> <td>- Autorització menors amb domicili diferent dels progenitors padró habitants</td></tr><tr> <td>- Declaració responsable progenitor inscripció o canvi domicili menors al Padró Habitants</td></tr><tr> <td>- DNI</td></tr><tr> <td>- Número d'Identitat d'Estranger (NIE)</td></tr><tr> <td>- Passaport</td></tr><tr> <td>- Targeta d'Identitat d'Estranger (TIE)</td></tr><tr> <td>- Escriptura de propietat</td></tr><tr> <td>- Contracte de lloguer</td></tr><tr> <td>- Rebut de lloguer</td></tr><tr> <td>- Llibre de família</td></tr><tr> <td>- Conveni regulador custòdia menors</td></tr><tr> <td>- Resolució judicial custòdia menors</td></tr></tbody></table>
		</td>
		</tr>
	
		</tbody></table>
<ul className="catalogo-links">	
		<li className="catalogo-link">
					<div className="catalogo-type main-element">
						<div className="dt-icon mouse"></div>
Tramitació Registre Electrònic</div>
					 
	<div className="acceso-tramites tramitar">
		<div className="texto-descriptivo ">Seleccione como desea identificarse:</div>
			<ul className="catalogo-accesos">
            <li className="vidchain">
					<div className="acceso-title acceso-mark vidchain main-element" onClick={()=> this.loginWithVIDChain()}>
Identificació en VIDwallet</div>
				</li>
				<li className="cert">
					<div className="acceso-title acceso-mark certificate main-element" onClick={()=> this.submit()}>
Identificació per a persones jurídiques o representants</div>
				</li>
				<li className="valid">
					<div className="acceso-title acceso-mark valid main-element" onClick={()=> this.submit()}>
Identificació per a persones fisiques</div>
				</li>
		</ul>
	</div>
</li>	
			<li className="catalogo-link">
				<div className="catalogo-type main-element">
					<div className="dt-icon user"></div>
<a target="__blank" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_PRESENCIAL">Tramitració Presencial</a>
				</div>
			</li>
		</ul>	

	</div>
					</div>
					
				</div>
			</div>

</div>
				

        <div className="footer">
          <Footer></Footer>
        </div>
       
      </div>
    );
  }
}

export default Request;
