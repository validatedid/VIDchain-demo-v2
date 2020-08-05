import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Main from "./screens/Main";

const publicUrl =
  process.env.REACT_APP_DEMO || "http://localhost:3028/demo/home";
const basename = publicUrl ? new URL(publicUrl).pathname : "";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
