import React, { Component } from 'react';
import './Home.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';
import { OpenIDClient } from '../../libs/openid-connect/client';
// @ts-ignore
import {JSO, Popup} from 'jso'
import * as utils from "../../utils/utils";

interface Props {
	history?: any;
}
  
interface State {
  jwt: string,
}


class Home extends Component<Props, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      jwt: "",
    }
  }
  componentDidMount(){

  }

  async loginWithVIDChain(){
    var client = OpenIDClient.getInstance().getClient();
    //Wipe the tokens the library kept in the local Storage
    await client.wipeTokens()
    await client.callback();
    client.getToken({
			scopes: {
				request: ["openid", "offline"],
				require: ["openid", "offline"]
      }
    });
  }

  render() {
    return (
    <div>
    <Official></Official>
    <Header></Header>
    <div className= "content">
      <div className="login_form">
          <h4 className="mt-0">Access your city services</h4><br/>
          <p>You can manage all the city services from this website: subscriptions, taxes...</p>
          <div className="sign_in_vidchain">
              <a className="btn btn-default" href="#" role="button" onClick={() => this.loginWithVIDChain()}><i className="fa fa-check-square-o"></i>Sign in with ViDChain</a>
          </div>
          <div className="login_manual_form">
              <p>or</p>
              <form action="#" method="post">
                  <div className="form-group">
                      <i className="fa fa-user"></i>
                      <input type="text" name="username" id="user" placeholder="Username" />
                  </div>
                  <div className="form-group">
                      <i className="fa fa-lock" aria-hidden="true"></i>
                      <input type="password" name="username" id="pass" placeholder="Password" />
                  </div>
                      <button type="submit" className="btn btn-default" id="login_submit">Sign in</button>
              </form> 
              <div className="forget_pass one">
                  <a href="#"><i className="fa fa-question-circle" aria-hidden="true"></i>Forget Password</a>
              </div>
              <div className="forget_pass">
                  <a href="register.html"><i className="fa fa-user-plus" aria-hidden="true"></i>Didn't have a account? Register</a>
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

export default Home;
