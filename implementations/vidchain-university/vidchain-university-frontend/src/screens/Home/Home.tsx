import React, { Component } from 'react';
import './Home.css';
import Header from "../../components/Header/Header";
import Content from "../../components/Content/Content";
import Footer from "../../components/Footer/Footer";
import Banner from '../../components/Banner/Banner';
import { OpenIDClient } from '../../libs/openid-connect/client';

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
  async componentDidMount(){
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
  
  render() {
    return (
    <div>
    <Header></Header>
    <div className="App">
      <div id="wrapper" className="home-page">
        <Banner></Banner>
        <section id="call-to-action-2">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-11">
                <h3>Welcome to the University of Barcelona</h3>
                <p>Sign In to access to your profile and handle your credentials</p>
              </div>
            </div>
            <div className="row">
              <div className= "content">
                <div className="login_form">
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
            </div>
          </div>
        </section>
          
        <Content></Content>  
        <Footer></Footer>  
        </div>   
        <a href="#" className="scrollup"><i className="fa fa-angle-up active"></i></a>
    </div>

    </div>
    
    );
  }
}

export default Home;