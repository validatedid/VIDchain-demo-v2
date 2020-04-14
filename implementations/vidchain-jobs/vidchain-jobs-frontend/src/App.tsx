import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";

function App() {
  return (
    <div className="App">
            <BrowserRouter>
              {/* <Ribbon></Ribbon> */}
              <Switch>
                <Route exact path="/" component={Home} />
                <Route
                  exact
                  path="/login"
                  component={Login}
                />
              </Switch>
            </BrowserRouter>
  </div>
  );
}

export default App;
