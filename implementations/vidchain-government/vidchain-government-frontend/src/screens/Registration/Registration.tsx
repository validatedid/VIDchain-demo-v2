import React, { Component,Fragment } from 'react';
import './Registration.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';
import { Button, Form, Alert, Row,InputGroup, Col } from "react-bootstrap";
import {IFormData} from "../../interfaces/ICredentialData";
import axios from 'axios'
import * as config from '../../config';
import { Link } from "react-router-dom";
interface Props {
	did: string;
	jwt: string;
	location: any;
}
  
interface State {
	jwt: string,
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
	successGeneration: boolean
}

class Registration extends Component<Props,State> {

	constructor(props:any) {
		super(props);
		this.state = {
			jwt: "",
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
			successGeneration: false
		}
	}

	componentDidMount(){
		console.log(this.props.location.state);
		if(this.props.location.state){
			this.setState ({
				did: this.props.location.state.did,
				jwt: this.props.location.state.jwt
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
		let authorization = {
			headers: {
			  Authorization: "Bearer " + this.state.jwt
			}
		};
		let data = {
			issuer: config.DID,
			credentialSubject: {
				id: this.state.did,
				personIdentifier: this.state.did,
				currentFamilyName: this.state.firstname,
				currentGivenName: this.state.lastname,
				birthName: this.state.firstname,
				dateOfBirth: this.state.dateOfBirth,
				placeOfBirth: this.state.placeOfBirth,
				currentAddress: this.state.currentAddress+","+this.state.city+
				","+this.state.state+","+this.state.zip,
				gender: this.state.gender,
				govID: ""
			}
		}
		const response = await axios.post(config.API_URL + "verifiableid", data, authorization);
		//Check response
		console.log(response);
		this.setState ({
			successGeneration: true
		})
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

	


  render() {
	const { did, firstname,
		lastname,gender,
		dateOfBirth,placeOfBirth,
		currentAddress,city,
		state,zip,checkFields,successGeneration } = this.state;
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
			<Link to="/profile">
			<Button type="button" className="collect-button" >Continue</Button>
            </Link>
		</div>
		}
		{!successGeneration &&
	<Fragment>
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
	</div>
	<Footer></Footer>
    
    </div>
    
    );
  }
}

export default Registration;
