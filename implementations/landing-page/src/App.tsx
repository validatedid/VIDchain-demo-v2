import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Main from "./screens/Main/Main";
import Tutorial from "./screens/Tutorial/Tutorial"

const publicUrl =
  process.env.REACT_APP_DEMO || "http://localhost:3028";
const basename = publicUrl ? new URL(publicUrl).pathname : "";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <Switch>
          <Route exact path="/demo" component={Main} />
          <Route exact path="/demo/tutorial" component={Tutorial} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
