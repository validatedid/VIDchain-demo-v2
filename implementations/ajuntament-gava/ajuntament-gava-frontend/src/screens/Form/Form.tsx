import React, { Component } from "react";
import "./Form.css";
import * as utils from '../../utils/utils';
import { PresentationPayload, VerifiableCredential } from "../../interfaces/IPresentation";


interface Props {
  history?: any;
  location: any;
}

interface State {
  credentialSubjectCredential: any;
}

class Form extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
		credentialSubjectCredential: {},
    };
  }

  componentDidMount() {
    if(this.props.location.state && this.props.location.state.id_token){
		const {id_token} = this.props.location.state;
        const decodedIdToken = utils.decodeJWT(id_token);
        const jwt = decodedIdToken.jwt;
        if(jwt){
            const presentation: PresentationPayload = utils.decodeJWT(jwt);
			//The second credenntial is the Bank Attestation
			let credential: any = presentation.vp.verifiableCredential[0];
			
			if(credential.type[1] !== 'VidBankingCredential'){
				credential = presentation.vp.verifiableCredential[1];
			}
			console.log(credential);
			this.setState({
				credentialSubjectCredential: credential.credentialSubject
			});
        }
      }

  }

  submit(){
      console.log("submit");
  }


  render() {
	  const {credentialSubjectCredential} = this.state;
    return (
      <div>
        <div id="cabecera">
            <div className="titulo">
            
            Electronic registration</div>
            <div className="clock">
                Time:<span id="clock" >
                    &nbsp;
                </span>
            </div>					
        </div>
        <div className="FormMain" >	
        <h1>Certificate of Basic Health Area</h1>
					
					<ul className="pasos textPrimero" >
						<li id="primero" className="primero" >1. Fill out form</li>
						<li className="desactivado">2. Sign</li>
						<li className="ultimo desactivado" >3. Download receipt</li>
					</ul>
					<div className="clear"></div>
					
					<div className="info_obligatorios">
						<span className="obligatorio">&nbsp;&nbsp;</span> = Required fields</div>
					<p className="clear"></p>
					<div className="subtextoCabecera">			
						<p>Certificate of Basic Health Area</p>	
					</div>
                    <br/><br/>
<h2>Data of the requester</h2>

<div id="selectorPersonaTramite">
	<table className="formularioSol" width="100%">
		<tr>
			<td className="rowDatos"><label className="rowDatosText">For this procedure, you act as:</label></td>
		
			<td valign="middle">
			<table className="formularioSol">
				<tr>				
					<td valign="middle"><input type="radio" className="radio"
							name="tipoActuacion" value="I"
							id="tipoActuacion"  /></td>
						<td valign="middle">Requester</td>
					<td valign="middle"><input type="radio" className="radio"
							id="tipoActuacion" name="tipoActuacion" value="R" />
						</td>
						<td valign="middle">Representative</td>
						</tr>
			</table>
			</td>
		</tr>
	</table>
</div>

<div id="personaInteresada">
<legend className="fieldlegend">
Data of the interested party</legend>
	<div id="PERSONA">
		<p>
		<table width="100%">
			<tr>
				<td>
				<label>Person:</label> 
				<table><tr><td>
					<input  type="radio" id="tipoPersona" className="radio"
						name="tipoPersona" value="IF" /></td>
						<td>
					<div id="txtTipoPersona">Física</div>
					</td></tr></table>
				</td>
				<td>				
					
				</td>
			</tr>
		</table>
		</p>

		<div id="DocuNumJuridica" className="display:none">
		<input type="hidden" id="IJAcronym" name="IJAcronym" value="ES"/>
		<table >
				<tr>
				<td width="15%">
					<label>DID:</label>
					<div className="display: none"></div>
				</td>					
				<td valign="top"><span className="campoHoriz">
				 <input  className="inputDID" type="text" id="IJCIF" name="CIF" value={credentialSubjectCredential.id} />
				 </span>
				</td>				
				</tr>
			</table>
		</div>

		<div id="InteresadaFisica">
			<p>
			<table className="width: 100%;">
				<tr>
					<td className="width: 15%;"><label >Bank Account IBAN:</label></td>
					<td><span className="campoHoriz">
					<table cellPadding="0" cellSpacing="0">
						<tr>
							<td><input  className="inputDID" type="text" id="IFNombre" name="nombre"
								value={credentialSubjectCredential.bank_account ? credentialSubjectCredential.bank_account.identifiers[1].identification :  '-'} /> <label>IBAN</label></td>
						</tr>
						<tr>
							<td>
							<div id="IFNombreCombo"></div>
							</td>
						</tr>
					</table>
					</span>
					</td>
					</tr>
					</table>
			</p>
		</div>
		
		
		
		
		<div id="InteresadaFisica">
			<p>
			<table className="width: 100%;">
				<tr>
					<td className="width: 15%;"><label >Name:</label></td>
					<td><span className="campoHoriz">
					<table cellPadding="0" cellSpacing="0">
						<tr>
							<td><input  className="inputReadOnly" type="text" id="IFNombre" name="nombre"
								value={credentialSubjectCredential.given_name} /> <label>Name</label></td>
						</tr>
						<tr>
							<td>
							<div id="IFNombreCombo"></div>
							</td>
						</tr>
					</table>
					</span> <span className="campoHoriz">
					<table cellPadding="0" cellSpacing="0">
						<tr>
							<td><input className="inputReadOnly" type="text" id="IFApellido1"  name="apellido1"
								value={credentialSubjectCredential.family_name} /> <label>Surname:</label></td>
						</tr>
						<tr>
							<td>
							<div id="IFApellido1Combo"></div>
							</td>
						</tr>
					</table>
					</span> <span className="campoHoriz">
					<table cellPadding="0" cellSpacing="0">
						<tr>
							<td><input className="inputReadOnly" type="text" id="IFApellido2"  name="apellido2"
								value="" /> <label>Second surname:</label> <label></label></td>
						</tr>
					</table>
					</span></td>
				</tr>
			</table>
			</p>
		</div>
        </div>
        </div>
            <h2>Means of notification</h2>
            <input type="radio" checked name="modoNotificacion" id="modoNotificacion" value="E"/><b>Electronic Notification</b>
                
                <br/>
            <div id="modoPapel">
            <div id="radioModoNotificacionPapel">
                <input type="radio" name="modoNotificacion" value="P" id="modoNotificacion" /><b>Notification Paper</b><br/>
            </div>					
            <div id="notificacionPapel" className="display:none; text-align: justify;">							
                <br/>
                </div>
                </div>
            
                <h2>Other means of warning</h2>
                <div id="ContactWays" className="display:none">
                    <table cellPadding="0" cellSpacing="0">
                        <tr>
                        <td className="width:27.7em">&nbsp;
                        </td>
                        <td><b>Preferred</b>
                        </td>
                        </tr>
                    </table>
                    <div id="CONTACT_F" className="CONTACT_F">
                        <table >
                            <tr id="tr3">	
                                <td>	
                                    <label>
                                    Mobile phone:</label>
                                    <div className="display:none"><label></label></div>
                                    <input type="hidden" id="dboid3" name="dboid3"/>
                                </td>
                                <td>	
                                    <table>
                                    <tr>
                                    <td>
                                        
                                        <input className="0" type="text" name="contact3" id="contact3" />
                                        </td><td>
                                        <div className="contactInfo">
                                            <input type="checkbox" disabled className="inputReadOnly" id="info3" name="info3"></input>
                                        </div>
                                    </td>
                                    </tr>
                                    </table>
                                    </td>
                                </tr>
                            </table>
                            </div>
                            <h2>Documentation to provide:</h2>
			 <div className="text-align:center">
                <span className=" width: 95%">
                    <select className="width: 28.125em" name="gruposDoc" id="gruposDoc">
                        <option value="all">All documents</option>
                    </select>
                    <input type="hidden" id="auxaccess"/>
                    </span>
				
                </div>
                </div>

                <br/>
		<input  type="checkbox" name="lopdok" id="lopdok"/> I give authorization and informed consent to the processing of my data for the purpose indicated. (see information about <strong>
            <a href="https://eseu.gava.cat/sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_PROTECDATA" target="_blank">data protection rights.</a></strong>)
            <div className="clear"></div>



        </div>
      </div>
    );
  }
}

export default Form;
