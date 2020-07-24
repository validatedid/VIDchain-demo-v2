import React, { Component } from "react";
import "./Header.css";


class Header extends Component {


  render() {
    return (
        <div >
        <header>
              <div className="navbar navbar-default navbar-static-top">
                  <div className="container">
                      <div className="navbar-header">
                          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                              <span className="icon-bar"></span>
                              <span className="icon-bar"></span>
                              <span className="icon-bar"></span>
                          </button>
                          <a className="navbar-brand" href="/demo/university/"><img src={require("../../assets/images/logo.png")} alt="logo"/>&nbsp;&nbsp;ACME University</a>
                      </div>
                      <div className="navbar-collapse collapse ">
                          <ul className="nav navbar-nav">
                              <li className="active"><a href="#">Home</a></li> 
                  <li className="dropdown">
                              <a href="#" data-toggle="dropdown" className="dropdown-toggle">About Us <b className="caret"></b></a>
                              <ul className="dropdown-menu">
                                  <li><a href="#">Our Institute</a></li>
                                  <li><a href="#">Our Team</a></li>
                                  <li><a href="#">News</a></li> 
                                  <li><a href="#">Investors</a></li>
                              </ul>
                          </li> 
                              <li><a href="#">Courses</a></li>
                              <li><a href="#">Student Portal</a></li>
                          </ul>
                      </div>
                  </div>
              </div>
        </header>
      </div>
    );
  }
}

export default Header;
