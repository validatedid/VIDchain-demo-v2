import React, { Component,Fragment } from 'react';
import './Registration.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';
import { Button, Form, Alert, Row,InputGroup, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
interface Props {
	did: string;
	location: any;
}
  
interface State {

}
class Registration extends Component<Props,State> {

	constructor(props:any) {
		super(props);
	}
  componentDidMount(){
	var did = this.props.location.state.did;
	console.log("in Registration");
	console.log(did);
  }

  generateCredential(){

  }

  render() {
	var did = this.props.location.state.did;  
    return (
    <div>
    <Official></Official>
	<Header></Header>
	<div className="page">
      <main className="main">
	<Fragment>
      <h1>Request eID VC</h1>
      <p>All the fields are required unless otherwise stated.</p>
	  <Form noValidate onSubmit={this.generateCredential}>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control as="select" custom>
			<option>Male</option>
			<option>Female</option>
			</Form.Control>
        </Form.Group>
      </Form.Row>

	  <Form.Row>
        <Form.Group as={Col} md="6" controlId="validationDateOfBirth">
          <Form.Label>Date Of Birth</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Date Of Birth"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationPlaceOfBirth">
          <Form.Label>Place Of Birth</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Place Of Birth"
            defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
	  <Form.Row>
	  <Form.Group as={Col} md="10" controlId="validationAddress">
          <Form.Label>Current Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="CurrentAddress"
            defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
	  
	  </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
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
	  <Button type="submit">Submit form</Button>
        {/* <Form.Group controlId="formDID">
          <Form.Label>Person identifier</Form.Label>
          <Form.Control plaintext readOnly defaultValue="email@example.com" />
          <Form.Text className="text-muted">Your decentralized identifier</Form.Text>
        </Form.Group> */}
        {/* <Form.Group controlId="exampleForm.currentFamilyName">
          <Form.Label>Current Family Name</Form.Label>
          <Form.Control
            type="text"
            name="currentFamilyName"
            defaultValue={defaultLastName}
            ref={register({ required: true })}
            isInvalid={!!errors.currentFamilyName}
          />
          <Form.Text className="text-muted">e.g. van Blokketen</Form.Text>
          {errors.currentFamilyName && (
            <Form.Control.Feedback type="invalid">
              Current Family Name is required
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="exampleForm.currentGivenName">
          <Form.Label>Current Given Name</Form.Label>
          <Form.Control
            type="text"
            name="currentGivenName"
            defaultValue={defaultFirstName}
            ref={register({ required: true })}
            isInvalid={!!errors.currentGivenName}
          />
          <Form.Text className="text-muted">e.g. Eva</Form.Text>
          {errors.currentGivenName && (
            <Form.Control.Feedback type="invalid">
              Current Given Name is required
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="exampleForm.birthName">
          <Form.Label>Birth Name (optional)</Form.Label>
          <Form.Control
            type="text"
            name="birthName"
            defaultValue={defaultLastName}
            ref={register({ required: false })}
          />
          <Form.Text className="text-muted">e.g. van Blokketen</Form.Text>
        </Form.Group>
        <Form.Group controlId="exampleForm.dateOfBirth">
          <Form.Label>Date of birth</Form.Label>
          <Form.Control
            type="text"
            name="dateOfBirth"
            maxLength="10"
            ref={register({
              required: "Date of birth is required",
              pattern: {
                value: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
                message: "Date of birth doesn't match format YYYY-MM-DD"
              }
            })}
            isInvalid={!!errors.dateOfBirth}
          />
          <Form.Text className="text-muted">
            Format: YYYY-MM-DD, e.g. 1998-02-14
          </Form.Text>
          {errors.dateOfBirth && (
            <Form.Control.Feedback type="invalid">
              {errors.dateOfBirth.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="exampleForm.placeOfBirth">
          <Form.Label>Place of birth</Form.Label>
          <Form.Control
            type="text"
            name="placeOfBirth"
            ref={register({ required: true })}
            isInvalid={!!errors.placeOfBirth}
          />
          <Form.Text className="text-muted">e.g. Brussels</Form.Text>
          {errors.placeOfBirth && (
            <Form.Control.Feedback type="invalid">
              Place of birth is required
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="exampleForm.currentAddress">
          <Form.Label>Current Address</Form.Label>
          <Form.Control
            type="text"
            name="currentAddress"
            ref={register({ required: true })}
            isInvalid={!!errors.currentAddress}
          />
          <Form.Text className="text-muted">e.g. 44, rue de Fame</Form.Text>
          {errors.currentAddress && (
            <Form.Control.Feedback type="invalid">
              Current Address is required
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="exampleForm.gender">
          <Form.Label>Gender</Form.Label>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="genderMale"
              name="gender"
              label="Male"
              value="Male"
              ref={register({ required: true })}
            />
            <Form.Check
              type="radio"
              id="genderFemale"
              name="gender"
              label="Female"
              value="Female"
              ref={register({ required: true })}
            />
            {errors.gender && (
              <Form.Control.Feedback
                type="invalid"
                style={{ display: "block" }}
              >
                Gender is required
              </Form.Control.Feedback>
            )}
          </div>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={requestStatus === REQUEST_STATUS.PENDING}
        >
          {requestStatus === REQUEST_STATUS.PENDING ? (
            <>Sending request...</>
          ) : (
            <>Collect the eID VC with your SSI App</>
          )}
        </Button>
        {requestStatus === REQUEST_STATUS.FAILED && (
          <Alert variant="danger" className="mt-3">
            Ouch! Something went wrong... Check the console to know more about
            what happened.
          </Alert>
        )} */}
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
