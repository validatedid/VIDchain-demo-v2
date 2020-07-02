import React, { Component } from 'react';
import './Home.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';
import {ICredentialData} from "../../interfaces/dtos";
import { OpenIDClient } from '../../libs/openid-connect/client';
import { Form, Button } from 'react-bootstrap';
// @ts-ignore

interface Props {
	history?: any;
}
  
interface State {
  name: string,
  jwt: string,
  user: ICredentialData,
}

class Home extends Component<Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      jwt: "",
      user: {} as ICredentialData
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
        /*let credentialSubject:ICredentialData = {
          id: "1111111A",
          firstName: "Santi",
          lastName: "Casas",
          dateOfBirth: "01/01/1990",
          placeOfBirth: "Barcelona",
          currentAddress: "C/Arago 179",
          city:"Barcelona",
          state: "Barcelona",
          zip: "08011",
          gender: "Male",
        };*/
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
        /*this.setState ({
          user: credentialSubject
        });*/
        console.log(this.state.user);
        var loaded = true;
         break; 
      } 
      case "ivan" : { 
        let credentialSubject:ICredentialData = {
          id: "2222222B",
          firstName: "Ivan",
          lastName: "Basart",
          dateOfBirth: "01/01/1990",
          placeOfBirth: "Barcelona",
          currentAddress: "C/Arago 179",
          city:"Barcelona",
          state: "Barcelona",
          zip: "08011",
          gender: "Male",
        };

        this.setState ({
          user: credentialSubject
        })
        var loaded = true;
        break; 
      } 
      case "xavi" : { 
        let credentialSubject:ICredentialData = {
          id: "3333333C",
          firstName: "Xavi",
          lastName: "Vila",
          dateOfBirth: "01/01/1990",
          placeOfBirth: "Barcelona",
          currentAddress: "C/Arago 179",
          city:"Barcelona",
          state: "Barcelona",
          zip: "08011",
          gender: "Male",
        };
        this.setState ({
          user: credentialSubject
        })
        var loaded = true;
        break; 
      } 
      case "albert" : { 
        let credentialSubject:ICredentialData = {
          id: "4444444C",
          firstName: "Albert",
          lastName: "Solana",
          dateOfBirth: "01/01/1990",
          placeOfBirth: "Barcelona",
          currentAddress: "C/Arago 179",
          city:"Barcelona",
          state: "Barcelona",
          zip: "08011",
          gender: "Male",
        };
        this.setState ({
          user: credentialSubject
        })
        var loaded = true;
        break; 
      } 
      default: { 
        var loaded = false;
        //TODO POPUP ERROR LOGIN 
         break; 
      } 
   }
   if (loaded){
    console.log("loaded!!!");
    console.log(this.state.user);
    this.login();
   }
} 

  render() {
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
