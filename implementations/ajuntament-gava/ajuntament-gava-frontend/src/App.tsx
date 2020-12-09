import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./screens/Home/Home";
import Profile from "./screens/Profile/Profile";
import Request from "./screens/Request/Request";
import Callback from "./screens/Callback/Callback";
import VidchainIdentity from "./screens/VidchainIdentity/VidchainIdentity";
const dotenv = require("dotenv");
// importing .env variables

const publicUrl =
  process.env.REACT_APP_DEMO || "http://localhost:9090/demo/gavius";
const basename = publicUrl ? new URL(publicUrl).pathname : "";

function App() {
  dotenv.config();
  return (
    <div>
      <BrowserRouter basename={basename}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/request" component={Request} />
          <Route path="/callback" component={Callback} />
          <Route path="/login" component={VidchainIdentity} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
