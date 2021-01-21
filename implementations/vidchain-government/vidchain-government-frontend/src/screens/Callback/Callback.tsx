import React, { Component } from "react";
import "./Callback.css";
import { Redirect } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import * as governmentBackend from "../../apis/governmentBackend";
import { Ring } from "react-spinners-css";
import * as config from "../../config";

interface Props {
  history: any;
  location: any;
  match: any;
}

interface State {
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires: number;
  error: boolean;
}

class Callback extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      access_token: "",
      refresh_token: "",
      id_token: "",
      expires: 0,
      error: false,
    };
  }

  async componentDidMount() {
    const code = new URLSearchParams(this.props.location.search).get("code");
    if(code){
      const token = await this.getAuthToken(code);
      if (token !== null) {
        this.setState({
          access_token: token.access_token,
          refresh_token: token.refresh_token,
          id_token: token.id_token,
          expires: token.expires,
        });
      }
      this.goToProfile();
    }
  }

  async getAuthToken(code: string){
    try {
      const response = await governmentBackend.getToken(
        {
            code: code,
            client_id: config.CLIENT_ID,
            redirect_uri: config.REDIRECT_CALLBACK,
            grant_type: "authorization_code",
          }
      );
      return response;
    } catch (error) {
      this.setState({
        error: true
      })
    }
  }

  goToProfile() {
    const { access_token, refresh_token, id_token } = this.state;
    this.props.history.push({
      pathname: "/profile",
      state: {
        access_token: access_token,
        refresh_token: refresh_token,
        id_token: id_token
      },
    });
  }

  render() {
    const { access_token, error } = this.state;
    if (access_token != null && !error) {
      return (
        <div>
          <Header></Header>
          <div className="content">
              <div className="wrapper">
                <h2>We have sent you a request to your wallet,</h2>
                <h2>please provide your Verifiable ID.</h2>
                <div className="spinnerContainer">
                  <Ring color="red" />
                </div>
                <p>Waiting to receive your credential...</p>
              </div>
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
