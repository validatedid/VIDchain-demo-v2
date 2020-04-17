import React, { Component,Fragment } from 'react';
import './Registration.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';
import { Button, Form, Alert, Row,InputGroup, Col } from "react-bootstrap";
import {IFormData} from "../../interfaces/ICredentialData";

interface Props {
	did: string;
	location: any;
}
  
interface State {
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
}

class Registration extends Component<Props,State> {

	constructor(props:any) {
		super(props);
		this.state = {
			did: "",
			firstname: "",
			lastname: "",
			gender: "Male",
			dateOfBirth: "",
			placeOfBirth: "",
			currentAddress: "",
			city: "",
			state: "",
			zip: ""
		}
	}

	componentDidMount(){
		if(this.props.location.state.did){
			this.setState ({
				did: this.props.location.state.did
			});
		}	
	}

	generateCredential(){
		console.log(this.state);
	}



  render() {
	const { did, firstname,lastname,gender,dateOfBirth,placeOfBirth,currentAddress,city,state,zip } = this.state;
    return (
    <div>
    <Official></Official>
	<Header></Header>
	<div className="page">
      <main className="main">
	<Fragment>
      <h1>Request eID VC</h1>
      <p>All the fields are required unless otherwise stated.</p>
	  <Form>
	   <Form.Group as={Row} md="12" controlId="formDID">
			<Form.Label column md="4">Your Decentralized Indentifier (DID)</Form.Label>
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
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            value={lastname}
			onChange={(event:any) =>this.setState({lastname: event.target.value})}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control as="select" custom
		  	value={gender}
			onChange={(event:any) =>this.setState({gender: event.target.value})}>
			<option value="Male">Male</option>
			<option value="Female">Female</option>
			</Form.Control>
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
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="formPlaceOfBirth">
          <Form.Label>Place Of Birth</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Place Of Birth"
            value={placeOfBirth}
			onChange={(event:any) =>this.setState({placeOfBirth: event.target.value})}
          />
        </Form.Group>
      </Form.Row>
	  <Form.Row>
	  <Form.Group as={Col} md="10" controlId="formAddress">
          <Form.Label>Current Address</Form.Label>∫
          <Form.Control
            required
            type="text"
            placeholder="CurrentAddress"
            value={currentAddress}
			onChange={(event:any) =>this.setState({currentAddress: event.target.value})}
          />
        </Form.Group>
	  
	  </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="6" controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required 
		  	value={city}
		  	onChange={(event:any) =>this.setState({city: event.target.value})}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="formState">
          <Form.Label>State</Form.Label>
		  <Form.Control type="text" placeholder="State" required
		  	value={state}
			onChange={(event:any) =>this.setState({state: event.target.value})} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="formZip">
          <Form.Label>Zip</Form.Label>
		  <Form.Control type="text" placeholder="Zip" required
		  	value={zip}
		  	onChange={(event:any) =>this.setState({zip: event.target.value})} />
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
	  <Button type="button" onClick={() =>this.generateCredential()}>Submit form</Button>
      </Form>
	  
    </Fragment>
	</main>
	</div>
	<Footer></Footer>
    
    </div>
    
    );
  }
}

export default Registration;
