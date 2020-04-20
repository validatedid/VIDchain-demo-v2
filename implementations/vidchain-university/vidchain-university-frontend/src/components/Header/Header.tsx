import React, { Component } from "react";
import "./Header.css";


class Header extends Component {


  render() {
    return (
        <div >
          <div className="topbar">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <p className="pull-left hidden-xs">Barcelona University</p>
                <p className="pull-right"><i className="fa fa-phone"></i>Tel No. (+001) 123-456-789</p>
              </div>
            </div>
          </div>
        </div>

        <header>
              <div className="navbar navbar-default navbar-static-top">
                  <div className="container">
                      <div className="navbar-header">
                          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                              <span className="icon-bar"></span>
                              <span className="icon-bar"></span>
                              <span className="icon-bar"></span>
                          </button>
                          <a className="navbar-brand" href="#"><img src={require("../../assets/images/logo.png")} alt="logo"/>University of Barcelona</a>
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
                              <li><a href="#">Fees</a></li>
                              <li><a href="#">Contact</a></li>
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
