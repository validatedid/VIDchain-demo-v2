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
    const {id_token} = this.props.location.state;
    if(id_token){
        const decodedIdToken = utils.decodeJWT(id_token);
        const jwt = decodedIdToken.jwt;
        if(jwt){
            const presentation: PresentationPayload = utils.decodeJWT(jwt);
            console.log(presentation.vp);
			const credential: any = presentation.vp.verifiableCredential[0];
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
            
            Registro electrónico</div>
            <div className="clock">
                Hora:<span id="clock" >
                    &nbsp;
                </span>
            </div>					
        </div>
        <div className="FormMain" >	
        <h1>Certificado de Área Básica de Salud (ABS)</h1>
					
					<ul className="pasos textPrimero" >
						<li id="primero" className="primero" >1. Rellenar formulario</li>
						<li className="desactivado">2. Firmar</li>
						<li className="ultimo desactivado" >3. Descargar justificante</li>
					</ul>
					<div className="clear"></div>
					
					<div className="info_obligatorios">
						<span className="obligatorio">&nbsp;&nbsp;</span> = Campos obligatorios</div>
					<p className="clear"></p>
					<div className="subtextoCabecera">			
						<p>Certificado de Área Básica de Salud</p>	
					</div>
                    <br/><br/>
<h2>Datos de la persona interesada</h2>

<div id="selectorPersonaTramite">
	<table className="formularioSol" width="100%">
		<tr>
			<td className="rowDatos"><label className="rowDatosText">Para este trámite, usted actúa en calidad de:</label></td>
		
			<td valign="middle">
			<table className="formularioSol">
				<tr>				
					<td valign="middle"><input type="radio" className="radio"
							name="tipoActuacion" value="I"
							id="tipoActuacion"  /></td>
						<td valign="middle">Interesado</td>
					<td valign="middle"><input type="radio" className="radio"
							id="tipoActuacion" name="tipoActuacion" value="R" />
						</td>
						<td valign="middle">Representante</td>
						</tr>
			</table>
			</td>
		</tr>
	</table>
</div>

<div id="personaInteresada">
<legend className="fieldlegend">Datos del interesado/a</legend>
	<div id="PERSONA">
		<p>
		<table width="100%">
			<tr>
				<td>
				<label>Persona:</label> 
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
					<td className="width: 15%;"><label >Birthdate:</label></td>
					<td><span className="campoHoriz">
					<table cellPadding="0" cellSpacing="0">
						<tr>
							<td><input  className="inputReadOnly" type="text" id="IFNombre" name="nombre"
								value={credentialSubjectCredential.birthdate} /> <label>Birthdate</label></td>
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
					<td className="width: 15%;"><label >Nombre:</label></td>
					<td><span className="campoHoriz">
					<table cellPadding="0" cellSpacing="0">
						<tr>
							<td><input  className="inputReadOnly" type="text" id="IFNombre" name="nombre"
								value={credentialSubjectCredential.given_name} /> <label>Nombre</label></td>
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
								value={credentialSubjectCredential.family_name} /> <label>Primer Apellido</label></td>
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
								value="" /> <label>Segundo Apellido</label> <label></label></td>
						</tr>
					</table>
					</span></td>
				</tr>
			</table>
			</p>
		</div>
        </div>
        </div>
            <h2>Medios de notificación</h2>
            <input type="radio" checked name="modoNotificacion" id="modoNotificacion" value="E"/><b>Notificación Electrónica</b>
                
                <br/>
            <div id="modoPapel">
            <div id="radioModoNotificacionPapel">
                <input type="radio" name="modoNotificacion" value="P" id="modoNotificacion" /><b>Notificación Papel</b><br/>
            </div>					
            <div id="notificacionPapel" className="display:none; text-align: justify;">							
                <br/>
                </div>
                </div>
            
                <h2>Otros medios de aviso</h2>
                <div id="ContactWays" className="display:none">
                    <table cellPadding="0" cellSpacing="0">
                        <tr>
                        <td className="width:27.7em">&nbsp;
                        </td>
                        <td><b>Preferente</b>
                        </td>
                        </tr>
                    </table>
                    <div id="CONTACT_F" className="CONTACT_F">
                        <table >
                            <tr id="tr3">	
                                <td>	
                                    <label>
                                    Teléfono móvil:</label>
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
                            <h2>Documentación a aportar</h2>
			 <div className="text-align:center">
                <span className=" width: 95%">
                    <select className="width: 28.125em" name="gruposDoc" id="gruposDoc">
                        <option value="all">Todos los documentos</option>
                    </select>
                    <input type="hidden" id="auxaccess"/>
                    </span>
				
                </div>
                </div>

                <br/>
		<input  type="checkbox" name="lopdok" id="lopdok"/>
		Presto autorización y consentimiento informado al tratamiento de mis datos para la finalidad indicada.(ver informaci&oacute;n sobre <strong>
            <a href="https://eseu.gava.cat/sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_PROTECDATA" target="_blank">protecci&oacute;n de datos</a></strong>)
            <div className="clear"></div>



        </div>
      </div>
    );
  }
}

export default Form;
