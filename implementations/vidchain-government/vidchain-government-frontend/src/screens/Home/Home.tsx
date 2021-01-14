import React, { Component } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from "../../components/Official/Official";
import { OpenIDClient } from "../../libs/openid-connect/client";
import { Form, Button } from "react-bootstrap";
// @ts-ignore

interface Props {
  history?: any;
}

interface State {
  name: string;
}

class Home extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
    };
  }

  componentDidMount() {
    var client = OpenIDClient.getInstance().getClient();
    client.wipeTokens();
    var tutorial = sessionStorage.getItem("tutorial");
    localStorage.clear();
    sessionStorage.clear();
    if (tutorial) sessionStorage.setItem("tutorial", tutorial);
  }

  async loginWithVIDChain() {
    var client = OpenIDClient.getInstance().getClient();
    await client.callback();
    await client.getToken({
      scopes: {
        request: ["openid", "VerifiableIdCredential"]
      }, 
    });
  }

  async login() {
    if (this.state.name.toLowerCase() === "santi") {
      this.props.history.push({
        pathname: "/profile",
        state: {
          fakeLogin: true
        }
      });
    }
  }

  render() {
    return (
      <div>
        <div className="content">
          {/* <div className="login_form">
            <h4 className="mt-0">Access services</h4>
            <br />
            <p>
              You can manage all the city services from this website:
              subscriptions, taxes...
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
                  <Form.Control
                    placeholder="Username"
                    onChange={(event: any) =>
                      this.setState({ name: event.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                  <Form.Control type="password" placeholder="Password" />
                </div>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => this.login()}
                >
                  Submit
                </Button>
              </Form>
            </div>
          </div> */}
        </div>
        <div className="footer">
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default Home;
