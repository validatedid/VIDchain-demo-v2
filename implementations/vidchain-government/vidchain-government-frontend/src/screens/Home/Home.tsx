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
    localStorage.clear();
    sessionStorage.clear();
  }

  async loginWithVIDChain() {
    var client = OpenIDClient.getInstance().getClient();
    await client.callback();
    await client.getToken({
      scopes: {
        request: ["openid", "offline"],
        require: ["openid", "offline"],
      },
    });
  }

  async login() {
    this.props.history.push({
      pathname: "/profile",
    });
  }

  async loadFakeUser() {
    if (this.state.name.toLowerCase() === "santi") {
      localStorage.setItem("userPass", "true");
      sessionStorage.setItem("firstName", "Santi");
      sessionStorage.setItem("lastName", "Casas");
      sessionStorage.setItem("dateOfBirth", "01/01/1990");
      sessionStorage.setItem("placeOfBirth", "Barcelona");
      sessionStorage.setItem("documentNumber", "BAB188000");
      sessionStorage.setItem("documentType", "Carnet de Identidad");
      sessionStorage.setItem("nationality", "ESP");
      sessionStorage.setItem("stateIssuer", "ESP");
      sessionStorage.setItem("dateOfExpiry", "10/10/2020");
      sessionStorage.setItem("gender", "Male");
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
                  onClick={() => this.loadFakeUser()}
                >
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
