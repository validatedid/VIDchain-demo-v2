import React, { Component, Fragment } from "react";
import "./VidchainIdentity.css";
import { Redirect } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import * as agbarBackend from "../../apis/agbarBackend";
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
  socketSession: string;
  error: boolean;
}

class VidchainIdentity extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      access_token: "",
      refresh_token: "",
      id_token: "",
      expires: 0,
      socketSession: "",
      error: false,
    };
  }

  async componentDidMount() {
    const code = new URLSearchParams(this.props.location.search).get("code");
    if(code){
      const token = await this.getAuthToken(code);
      console.log('token');
      console.log(token);
      
      if (token !== null) {
        this.setState({
          access_token: token.access_token,
          refresh_token: token.refresh_token,
          id_token: token.id_token,
          expires: token.expires,
        });
        this.goToRequest();
      }
    }
  }

  async getAuthToken(code: string){
    try {
      const response = await agbarBackend.getToken(
        {
            code: code,
            client_id: config.VIDCHAIN_CLIENT_ID,
            redirect_uri: config.VIDCHAIN_REDIRECT_CALLBACK,
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


  goToRequest() {
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
        <Fragment>
          <Header></Header>
            <div className="contentCallback">
                <div className="spinnerContainer">
                  <Ring color="red" />
                </div>
                <p>Waiting to receive your credential...</p>
          </div>
          <div className="footer">
          </div>
          <Footer></Footer>

        </Fragment>


      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default VidchainIdentity;
