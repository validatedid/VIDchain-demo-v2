import React, { Component } from "react";
import "./Callback.css";
import { Redirect } from "react-router-dom";
import Official from "../../components/Official/Official";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { UserInfo } from "../../interfaces/dtos";
import { Ring } from "react-spinners-css";
import * as config from "../../config";
import axios from "axios";

interface Props {
  history: any;
  location: any;
  match: any;
}

interface State {
  errorMessage: string;
  error: boolean;
  redirect: boolean;
}

class Callback extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      errorMessage: "Error",
      error: false,
      redirect: false,
    };
  }

  async componentDidMount() {
    const code = new URLSearchParams(this.props.location.search).get("code");
    if(!code){
      this.setState({
        redirect: true
      })
    }
    else{
      this.getAuthToken(code);
    }
    
  }

  async getAuthToken(code: string){
    try {
      const response = await axios.post(
        config.BACKEND_URL+"/auth",{
            code: code,
            client_secret: config.CLIENT_SECRET,
            client_id: config.CLIENT_ID,
            redirect_uri: config.REDIRECT_CALLBACK,
            grant_type: "authorization_code",
          }
      );
      if(response.data.status === "ko"){
        this.setState({
          error: true,
          errorMessage: response.data.error
        })
      }
      if(response.data.status === "ok"){
        console.log(response.data);
        this.goToProfile(response.data);
      }
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }


  goToProfile(userData) {
    this.props.history.push({
      pathname: "/profile",
      state: {
        userData: userData,
      },
    });
  }

  render() {
    const { error, errorMessage, redirect } = this.state;
    if (!redirect) {
      return (
        <div>
          <Official></Official>
          <Header></Header>
          <div className="content">
            {error && (
              <div className="wrapper">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h2>Error authenticating!</h2>
                <br></br>
                <h6>{errorMessage}</h6>
                <br></br>
                <p>Please come back and try again...</p>
              </div>
            )}
            {!error && (
              <div className="wrapper">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="spinnerContainer">
                  <Ring color="red" />
                </div>
              </div>
            )}
          </div>
          <div className="footer">
            <Footer></Footer>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default Callback;
