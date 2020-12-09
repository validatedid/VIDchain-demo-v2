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

}

class Request extends Component<Props, State> {
  

  componentDidMount() {
    var clientValid = OpenIDClient.getInstance().getClient();
    var client = VidchainClient.getInstance().getClient();
    clientValid.wipeTokens();
    client.wipeTokens();
    localStorage.clear();
    sessionStorage.clear();
  }

  submit(){
      this.props.history.push({
        pathname: "/form"
      });
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
        request: ["openid", "VidBankingCredential"]
      },
    });
  }


  render() {
    return (
      <div className="page">
        <Official></Official>
        <Header></Header>
        <div className="content-area ovt_panel widget-area standard detalle actionsClassName">
		
		<h3 className="has-actions actionsClassName">
			<div className="detail-title">Subvenció Impost de Construccions i Obres ( ICIO)</div>
		</h3>
			<div className="ovt_frame">
				<div className="ovt_contenido">
					<div className="detalle">
						<div id="informacionTramite">
		<table className="tableInfoDetalle large">
		<caption>datos de la subsección</caption>
			<tbody><tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Finalitat:
				</td>
			<td className="valorAtributo altoPAuto">
				<p>Subvenció Impost de Construccions, instal·lacions i obres (ICIO)</p>
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
		<tr className="field custom-row">
		<td className="etiquetaAtributo">
			Òrgan Gestor:
				</td>
			<td className="valorAtributo altoPAuto">
				<p>Departament de Gestió Tributaria</p>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Presentació:
				</td>
			<td className="valorAtributo altoPAuto">
			<p>OAC Ajuntament</p>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Efecte del silenci Administratiu:
				</td>
			<td className="valorAtributo altoPAuto">
			<p>Desestimatori</p>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Pagament de taxes:
				</td>
			<td className="valorAtributo altoPAuto">
				<p>No aplica taxa</p>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Informació Addicional:
				</td>
			<td className="valorAtributo altoPAuto">
				<p>Uns dels requisits és que la llicència d’obres hagi estat demanada per:</p><ul>
					<li>- Efectuar obres de restitució, d’adaptació i de millora de guals i de voreres a la via pública.</li>
					<li>- Reparacions derivades del fenómen d’aluminosi, patologies estructurals o incendi.</li>
					<li>- Les millores d’aïllament tèrmic exigible, en les cobertes o façanes d’edificis preexistents.</li>
					<li>- Instal·lacions destinades a l’aprofitament de les aigües de pluja i la seva reutilització per a la neteja, el rec, etc. (canalització, dipòsits, basses, etc).</li>
					<br/>
					<p>Altres requisits es haver pagar la taxa i l'Impost i que la sol·licitud de la subvenció s'haura de realitzar de manera simultànea a la sol·licitud de la llicència d'obres i juntament amb el justificant del número de compte bancari</p>
					</ul>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Documentació relacionada:
				</td>
			<td className="valorAtributo altoPAuto columns">
		<a target="_blank" href="" className="link-icon pdfLink">VidBankingCredential</a> 
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
				<tr>
					<td className="ancho12">
					<b>Alt:</b></td><td>Amb sistema VIDwallet</td>
				</tr>
				</tbody></table>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Documents a Presentar:
				</td>
			<td className="valorAtributo ">
	<table><tbody><tr><td><strong>Documentació requerida</strong></td></tr><tr> 
			<td>- Bank details</td></tr></tbody></table>
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
