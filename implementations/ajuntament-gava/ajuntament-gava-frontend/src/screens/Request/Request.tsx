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
        request: ["openid", "VerifiableIdCredential", "BBVAAccountCredential"]
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
			<div className="detail-title">Construction works Tax Grant</div>
		</h3>
			<div className="ovt_frame">
				<div className="ovt_contenido">
					<div className="detalle">
						<div id="informacionTramite">
		<table className="tableInfoDetalle large">
		<caption>subsection data</caption>
			<tbody><tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Purpose:
				</td>
			<td className="valorAtributo altoPAuto">
				<p>Construction and Installations Tax Grant</p>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Submission Deadlines:
				</td>
			<td className="valorAtributo altoPAuto">
				<p>It can be done all year round</p>
		</td>
		</tr>
		<tr className="field custom-row">
		<td className="etiquetaAtributo">
			Managing Body:
				</td>
			<td className="valorAtributo altoPAuto">
				<p>Department of Tax Management</p>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Presentation:
				</td>
			<td className="valorAtributo altoPAuto">
			<p>OAC Council</p>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Effect of Administrative Silence:
				</td>
			<td className="valorAtributo altoPAuto">
			<p>Disappointing</p>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Payment of fees:
				</td>
			<td className="valorAtributo altoPAuto">
				<p>No fee applies</p>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Additional information:
				</td>
			<td className="valorAtributo altoPAuto">
				<p>One of the requirements is that the building permit has been applied for by:</p><ul>
					<li>- Carry out works to restore, adapt and improve fords and sidewalks on public roads.</li>
					<li>- Repairs due to the phenomenon of aluminosis, structural pathologies or fire.</li>
					<li>- Improvements in thermal insulation required, on the roofs or facades of pre-existing buildings.</li>
					<li>- Facilities for the use of rainwater and its reuse for cleaning, irrigation, etc. (piping, tanks, ponds, etc.).</li>
					<br/>
					<p>Other requirements are to have paid the fee and the tax and that the application for the grant must be made simultaneously with the application for the works license and together with the receipt of the bank account number</p>
					</ul>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Related documentation:
				</td>
			<td className="valorAtributo altoPAuto columns">
		<a target="_blank" href="" className="link-icon pdfLink">Banking Credential</a> 
		<br/>
		<a target="_blank" href="" className="link-icon pdfLink">Verifiable eID</a> 
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Applicant identification level:
				</td>
			<td className="valorAtributo ">
				<table cellPadding="0" cellSpacing="10">
				<tbody><tr>
					<td className="ancho12" valign="top">
					<b>High:</b></td>
					<td valign="top">Recognized digital certificate and electronic signature</td>
				</tr>
				<tr>
					<td className="ancho12">
					<b>High:</b></td><td>With Valid system</td>
				</tr>
				<tr>
					<td className="ancho12">
					<b>High:</b></td><td>With SSI systems</td>
				</tr>
				</tbody></table>
		</td>
		</tr>
	<tr className="field custom-row ">
		<td className="etiquetaAtributo">
			Documents to Present:
				</td>
			<td className="valorAtributo ">
	<table><tbody><tr><td><strong>Required documentation</strong></td></tr><tr> 
			<td>- ID</td></tr><tr>
			<td>- Bank details</td></tr></tbody></table>
		</td>
		</tr>
	
		</tbody></table>
<ul className="catalogo-links">	
		<li className="catalogo-link">
					<div className="catalogo-type main-element">
						<div className="dt-icon mouse"></div>
Electronic Registration Procedure</div>
					 
	<div className="acceso-tramites tramitar">
		<div className="texto-descriptivo ">Select how to identify:</div>
			<ul className="catalogo-accesos">
            <li className="vidchain">
					<div className="acceso-title acceso-mark vidchain main-element" onClick={()=> this.loginWithVIDChain()}>
SSI</div>
				</li>
				<li className="cert">
					<div className="acceso-title acceso-mark certificate main-element" onClick={()=> this.submit()}>
Identification for legal entities or representatives
</div>
				</li>
				<li className="valid">
					<div className="acceso-title acceso-mark valid main-element" onClick={()=> this.submit()}>
Identification for individuals</div>
				</li>
		</ul>
	</div>
</li>	
			<li className="catalogo-link">
				<div className="catalogo-type main-element">
					<div className="dt-icon user"></div>
<a target="__blank" href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_PRESENCIAL">
Face-to-face processing</a>
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
