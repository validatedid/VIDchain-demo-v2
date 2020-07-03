import React, { Component } from 'react';
import './Home.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';
import {ICredentialData} from "../../interfaces/dtos";
import { OpenIDClient } from '../../libs/openid-connect/client';
import { Form, Button, Toast } from 'react-bootstrap';
// @ts-ignore

interface Props {
	history?: any;
}
  
interface State {
  name: string,
  jwt: string,
  user: ICredentialData,
  error: boolean,
}

class Home extends Component<Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      jwt: "",
      user: {} as ICredentialData,
      error: false
    }
  }
  componentDidMount(){
    //Wipe the tokens the library kept in the local Storage
    var client = OpenIDClient.getInstance().getClient();
    client.wipeTokens()
  }

  async loginWithVIDChain(){
    var client = OpenIDClient.getInstance().getClient();
    await client.callback();
    await client.getToken({
			scopes: {
				request: ["openid", "offline"],
				require: ["openid", "offline"]
      }
    });
  }

  async login(){  
    const { user } = this.state;
    console.log("login()");
    console.log(user);
		this.props.history.push(
			{
        pathname: '/profile',
        state: { user: JSON.stringify(user) }
			}
      ); 
  }

  async loadFakeUser(){ 
    switch(this.state.name.toLowerCase()) { 
      case "santi" : { 
        this.state.user.id = "1111111A";
        this.state.user.firstName = "Santi";
        this.state.user.lastName = "Casas";
        this.state.user.dateOfBirth = "01/01/1990";
        this.state.user.placeOfBirth = "Barcelona";
        this.state.user.currentAddress = "C/Arago 179";
        this.state.user.city ="Barcelona";
        this.state.user.state = "Barcelona";
        this.state.user.zip = "08011";
        this.state.user.gender = "Male";
        var loaded = true;
        break; 
      } 
      case "ivan" : { 
        this.state.user.id = "2222222B";
        this.state.user.firstName = "Ivan";
        this.state.user.lastName = "Basart";
        this.state.user.dateOfBirth = "01/01/1990";
        this.state.user.placeOfBirth = "Barcelona";
        this.state.user.currentAddress = "C/Arago 179";
        this.state.user.city ="Barcelona";
        this.state.user.state = "Barcelona";
        this.state.user.zip = "08011";
        this.state.user.gender = "Male";
        var loaded = true;
        break; 
      } 
      case "xavi" : { 
        this.state.user.id = "333333C";
        this.state.user.firstName = "Xavi";
        this.state.user.lastName = "Vila";
        this.state.user.dateOfBirth = "01/01/1990";
        this.state.user.placeOfBirth = "Barcelona";
        this.state.user.currentAddress = "C/Arago 179";
        this.state.user.city ="Barcelona";
        this.state.user.state = "Barcelona";
        this.state.user.zip = "08011";
        this.state.user.gender = "Male";
        var loaded = true;
        break; 
      } 
      case "albert" : { 
        this.state.user.id = "4444444C";
        this.state.user.firstName = "Albert";
        this.state.user.lastName = "Solana";
        this.state.user.dateOfBirth = "01/01/1990";
        this.state.user.placeOfBirth = "Barcelona";
        this.state.user.currentAddress = "C/Arago 179";
        this.state.user.city ="Barcelona";
        this.state.user.state = "Barcelona";
        this.state.user.zip = "08011";
        this.state.user.gender = "Male";
        var loaded = true;
        break; 
      } 
      default: { 
        var loaded = false;
        this.setState ({
          error: true
        })
         break; 
      } 
   }
   if (loaded){
    sessionStorage.setItem('id', this.state.user.id);
    sessionStorage.setItem('firstName', this.state.user.firstName);
    sessionStorage.setItem('lastName', this.state.user.lastName);
    sessionStorage.setItem('dateOfBirth', this.state.user.dateOfBirth);
    sessionStorage.setItem('placeOfBirth', this.state.user.placeOfBirth);
    sessionStorage.setItem('currentAddress', this.state.user.currentAddress);
    sessionStorage.setItem('city', this.state.user.city);
    sessionStorage.setItem('state', this.state.user.state);
    sessionStorage.setItem('zip', this.state.user.zip);
    sessionStorage.setItem('gender', this.state.user.gender);
    this.login();
   }
} 

  render() {
    const { error} = this.state;  
    return (
          <div>
            <Official></Official>
            <Header></Header>
            <div className="content">
              <div className="login_form">
                <h4 className="mt-0">Access your city services</h4>
                <br />
                <p>
                  You can manage all the city services from this website: subscriptions,
                  taxes...
                </p>
                <div className="sign_in_vidchain">
                  <a
                    className="btn btn-default"
                    href="#"
                    role="button"
                    onClick={() => this.loginWithVIDChain()}
                  >
                    <i className="fa fa-check-square-o"></i>Sign in with ViDChain
                  </a>
                </div>
                <div>
                  <p>or</p>
                  <Form className="login_manual_form">
                  <div className="form-group">
                      <i className="fa fa-user"></i>
                      <Form.Control placeholder="Username" onChange={(event:any) =>this.setState({name: event.target.value})}/>
                    
                  </div>
                  <div className="form-group">
                      <i className="fa fa-lock" aria-hidden="true"></i>
                      <Form.Control type="password" placeholder="Password" />
                  </div>
                    <Button variant="primary" type="submit" onClick={() =>this.loadFakeUser()}>
                      Submit
                    </Button>
                  </Form>
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

export default Home;
