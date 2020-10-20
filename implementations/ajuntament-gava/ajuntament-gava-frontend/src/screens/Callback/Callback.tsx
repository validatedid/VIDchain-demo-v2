import React, { Component } from "react";
import "./Callback.css";
import { Redirect } from "react-router-dom";
import Official from "../../components/Official/Official";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { userInfo } from "../../interfaces/dtos";
import { Ring } from "react-spinners-css";
import * as config from "../../config";
import axios from "axios";

interface Props {
  history: any;
  location: any;
  match: any;
}

interface State {
  userInfo: userInfo;
  showCallback: boolean;
  error: boolean;
}

class Callback extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      userInfo: {} as userInfo,
      showCallback: false,
      error: false,
    };
  }

  async componentDidMount() {
    const code = new URLSearchParams(this.props.location.search).get("code");
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
      this.setState({
        showCallback: true,
      });
      console.log(response);
      //this.goToProfile(userData);
    } catch (error) {
      console.log(error);
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
    const { userInfo,error, showCallback } = this.state;
    if (userInfo.status != "ok" && !error) {
      return (
        <div>
          <Official></Official>
          <Header></Header>
          <div className="content">
            {showCallback && (
              <div className="wrapper">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h2>We have sent you a request to your wallet,</h2>
                <h2>please provide your Verifiable ID.</h2>
                <br></br>
                <p>Waiting to receive your credential...</p>
                <br></br>
                <div className="spinnerContainer">
                  <Ring color="red" />
                </div>
              </div>
            )}
            {!showCallback && (
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
