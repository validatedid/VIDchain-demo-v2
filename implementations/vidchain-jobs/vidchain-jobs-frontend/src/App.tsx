import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import CV from "./screens/CV/CV";

function App() {
  return (
    <div className="App">
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route
                  path="/login"
                  component={Login}
                />
                 <Route path="/CV" component={CV} />
              </Switch>
            </BrowserRouter>
  </div>
  );
}

export default App;
