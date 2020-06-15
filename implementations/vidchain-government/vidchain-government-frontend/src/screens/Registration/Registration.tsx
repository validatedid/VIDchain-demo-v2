import React, { Component,Fragment } from 'react';
import './Registration.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';
import { Button, Form, Alert, Row,InputGroup, Col, Toast } from "react-bootstrap";
import {ICredentialData} from "../../interfaces/dtos";
import * as utils from "../../utils/utils";
import * as vidchain from "../../apis/vidchain";
interface Props {
	did: string;
	code: string;
	history?: any;
	location: any;
}
  
interface State {
	access_token: string,
	refresh_token: string,
	id_token: string,
	did: string
	firstname: string
    lastname: string
    gender: string
    dateOfBirth: string
    placeOfBirth: string
    currentAddress: string
    city: string
    state: string
	zip: string
	checkFields: boolean,
	successGeneration: boolean,
	error: boolean
}

class Registration extends Component<Props,State> {

	constructor(props:any) {
		super(props);
		this.state = {
			access_token: "",
			refresh_token: "",
			id_token: "",
			did: "",
			firstname: "",
			lastname: "",
			gender: "Male",
			dateOfBirth: "",
			placeOfBirth: "",
			currentAddress: "",
			city: "",
			state: "",
			zip: "",
			checkFields: false,
			successGeneration: false,
			error: false
		}
	}

	componentDidMount(){
		if(this.props.location.state){
			this.setState ({
				access_token: this.props.location.state.access_token,
				refresh_token: this.props.location.state.refresh_token,
				id_token: this.props.location.state.id_token,
				did: utils.getUserDid(this.props.location.state.id_token),
			});
		}
		
	}

	submit(){
		this.setState ({
			checkFields: true
		});
		if(this.nonEmptyFields()){
			this.setState ({
				checkFields: false
			});
			this.generateCredential();
		}
	}

	async generateCredential(){
		let credentialSubject:ICredentialData = {
			id: this.state.did,
			firstName: this.state.firstname,
			lastName: this.state.lastname,
			dateOfBirth: this.state.dateOfBirth,
			placeOfBirth: this.state.placeOfBirth,
			currentAddress: this.state.currentAddress,
			city:this.state.city,
			state: this.state.state,
			zip: this.state.zip,
			gender: this.state.gender,
		};
		const token = await vidchain.getAuthzToken();
		const response = await vidchain.generateVerifiableID(token, credentialSubject);
		//Check response
		if(response !== "Error"){
			this.setState ({
				successGeneration: true
			})
		}
		else{
			this.setState ({
				error: false
			})
		}

	};

	nonEmptyFields(): boolean{
		var nonEmptyFields = true;
		var { did, firstname,
			lastname,gender,
			dateOfBirth,placeOfBirth,
			currentAddress,city,
			state,zip } = this.state;
		if(did === "" || firstname === "" || lastname === "" || gender === "" ||
			dateOfBirth === "" ||placeOfBirth === "" ||currentAddress === "" ||city === "" ||
			state === "" ||zip === "" ){
				nonEmptyFields = false;
			}
		return nonEmptyFields
	}

	continue(){
		let credentialSubject:ICredentialData = {
			id: this.state.did,
			firstName: this.state.firstname,
			lastName: this.state.lastname,
			dateOfBirth: this.state.dateOfBirth,
			placeOfBirth: this.state.placeOfBirth,
			currentAddress: this.state.currentAddress,
			city:this.state.city,
			state: this.state.state,
			zip: this.state.zip,
			gender: this.state.gender,
		};
		var user = JSON.stringify(credentialSubject);
		//Store in localstorage (ideally in DB of the city)
		localStorage.setItem(credentialSubject.id, user);
		this.props.history.push(
			{
			  pathname: '/profile',
			  state: { user: user }
			}
		  ); 
		
	}

	toggleClose (){
		this.setState ({
			error: false
		})
	}
	


  render() {
	const { did, firstname,
		lastname,gender,
		dateOfBirth,placeOfBirth,
		currentAddress,city,
		state,zip,checkFields,successGeneration, error } = this.state;
    return (
    <div>
    <Official></Official>
	<Header></Header>
	<div className="page">
      <main className="main">
		{successGeneration &&
		<div className="fragmentSuccess"> 
			<h1>Your request has been issued.</h1>
			<p>Go to the notifications section in your APP Wallet</p>
			<Button type="button" className="collect-button" 
			onClick={()=> this.continue()}>Continue</Button>
		</div>
		}
		{!successGeneration &&
	<Fragment>
		<Toast show={error} onClose={() => this.toggleClose()}>
          <Toast.Header>
            <strong className="mr-auto">Error</strong>
            <small>Your City</small>
          </Toast.Header>
          <Toast.Body>Something wrong when generation the credential!</Toast.Body>
        </Toast>
      <h1>Request your eID Verifiable Credential</h1>
      <p>Fill all the fields, and claim the VC to receive it in you VIDchain mobile App.</p>
	  <Form>
	   <Form.Group as={Row} md="12" controlId="formDID">
			<Form.Label column md="4">Your Decentralized Indentifier (DID):</Form.Label>
			<Col md="8">
				<Form.Control plaintext readOnly defaultValue={did} />
			</Col>
		</Form.Group>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="formFirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
			placeholder="First name"
			value={firstname}
			onChange={(event:any) =>this.setState({firstname: event.target.value})}
			isInvalid={checkFields && (firstname==="")}
          />
		  	<Form.Control.Feedback type="invalid">
            	Please provide a valid name.
          	</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            value={lastname}
			onChange={(event:any) =>this.setState({lastname: event.target.value})}
			isInvalid={checkFields && (lastname==="")}
          />
		  	<Form.Control.Feedback type="invalid">
            	Please provide a valid last name.
          	</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control as="select" custom
		  	value={gender}
			onChange={(event:any) =>this.setState({gender: event.target.value})}
			isInvalid={checkFields && (gender==="")}>
				<option value="Male">Male</option>
				<option value="Female">Female</option>
			</Form.Control>
			<Form.Control.Feedback type="invalid">
            	Please provide a valid gender.
          	</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

	  <Form.Row>
        <Form.Group as={Col} md="6" controlId="formDateOfBirth">
          <Form.Label>Date Of Birth</Form.Label>
          <Form.Control
            required
            type="text"
			placeholder="Date Of Birth"
			value={dateOfBirth}
			onChange={(event:any) =>this.setState({dateOfBirth: event.target.value})}
			isInvalid={checkFields && (dateOfBirth==="")}
          />
		   <Form.Control.Feedback type="invalid">
            Please provide a valid date of birth.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="formPlaceOfBirth">
          <Form.Label>Place Of Birth</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Place Of Birth"
            value={placeOfBirth}
			onChange={(event:any) =>this.setState({placeOfBirth: event.target.value})}
			isInvalid={checkFields && (placeOfBirth==="")}
          />
		  <Form.Control.Feedback type="invalid">
            Please provide a valid place of birth.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
	  <Form.Row>
	  <Form.Group as={Col} md="12" controlId="formAddress">
          <Form.Label>Current Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="CurrentAddress"
            value={currentAddress}
			onChange={(event:any) =>this.setState({currentAddress: event.target.value})}
			isInvalid={checkFields && (currentAddress==="")}
          />
		  <Form.Control.Feedback type="invalid">
            Please provide a valid current address.
          </Form.Control.Feedback>
        </Form.Group>
	  
	  </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="6" controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required 
		  	value={city}
		  	onChange={(event:any) =>this.setState({city: event.target.value})}
			isInvalid={checkFields && (city==="")}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="formState">
          <Form.Label>State</Form.Label>
		  <Form.Control type="text" placeholder="State" required
		  	value={state}
			onChange={(event:any) =>this.setState({state: event.target.value})} 
			isInvalid={checkFields && (state==="")}/>
			<Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="formZip">
          <Form.Label>Zip</Form.Label>
		  <Form.Control type="text" placeholder="Zip" required
		  	value={zip}
			onChange={(event:any) =>this.setState({zip: event.target.value})} 
			isInvalid={checkFields && (zip==="")} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Group>
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
        />
      </Form.Group>
	  <Button type="button" className="collect-button" onClick={() =>this.submit()}>Collect the eID in my VIDchain Wallet</Button>
      </Form>
	  
    </Fragment>
  	}
	</main>
	</div >
	<Footer></Footer>
    
    </div>
    
    );
  }
}

export default Registration;
