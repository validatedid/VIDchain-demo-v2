import React, { Component } from "react";
import "./Footer.css";


class Footer extends Component {


  render() {
    return (
        <footer className="mt-4">
      <div className="footer-primary">
        <div className="footer-primary-nav container" role="navigation">
          <a href="#">Home</a>
          <a href="#">Disclaimer</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Web Standards</a>
          <a href="#">Site Credits</a>
          <a href="#">Site Map</a>      
        </div>
      </div>
      <div className="footer-main">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="media footer-media">
              <img className="align-self-center mr-3" src={require("../../assets/images/logoCity.png")}  alt="City" />
              <div className="media-body align-self-center">
                <h3 className="mt-0">The official website of Your City</h3>
              </div>
              </div>
          </div>
          <div className="col-sm-6">
            <div className="footer-main-right">
              <div className="footer-social-links">
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
              </div>
              <div className="footer-contact">
                  <h4>Contact Info</h4>
              </div>
              <div className="footer-contact-links">
                  <a href="#">info@city.gov</a>
                  <a href="#">(312)-774-2828</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
    );
  }
}

export default Footer;
