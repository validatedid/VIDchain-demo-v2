import React, { Component } from "react";
import "./Header.css";


class Header extends Component {


  render() {
    return (
     <header className="cds-header" role="banner">
        <div className="cds-navbar">
          <button className="cds-menu-btn">MENU</button>
          <div className="cds-logo" id="logo">
            <em className="cds-logo-text">
              <a href="https://dev.api.vidchain.net/demo" title="Home">
                <img src={require("../../assets/images/logoCity.png")} alt="Logo of the City"/>
                <h1 className="cds-header-title">&nbsp;&nbsp;&nbsp;Your City Website</h1>
              </a>
            </em>
          </div>
        </div>
      
        <nav role="navigation" className="cds-nav">
            <div className="cds-nav-inner">
              <button className="cds-nav-close">
                <img src="https://webapps1.chicago.gov/cdn/chiwds/0.9.1/img/close.svg" alt="close" />
              </button>
              <ul className="cds-nav-primary cds-accordion">
                <li>
                  <a className="cds-nav-link" href="/demo"><span>Home</span></a>
                </li>
                <li>
                  <button className="cds-accordion-button cds-nav-link" aria-expanded="false" aria-controls="nav-pi">
                    <span>Programs & Initiatives</span>
                  </button>
                  <div id="nav-pi" className="cds-nav-submenu cds-nav-megamenu row"  aria-hidden="true">
                    <div className="col-md-6">
                      <ul>							 					
                      <li>
                      <a title="Affordable Barcelona" href="#">Affordable City</a>
                      <a title="Barcelona Census 2020"  href="#">City Census 2020</a>
                      <a title="Consumer Protection"  href="#">Consumer Protection</a>
                      <a title="Education"  href="#">Education</a>
                      <a title="Environment"  href="#">Environment</a>
                      <a title="Food Service Establishments"  href="#">Food Service Establishments</a> 
                      <a title="Freedom of Information (FOIA)"  href="#">Freedom of Information (FOIA)</a>
                      <a title="Grants"  href="#">Grants</a>
                      <a title="Grounds for Peace"  href="#">Grounds for Peace</a>
                      <a title="Health &amp; Wellness"  href="#">Health &amp; Wellness</a>
                      <a title="Housing"  href="#">Housing</a>
      
                      </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul>
                      <li>
                      <a title="Inspections, Permitting &amp; Licensing"  href="#">Inspections, Permitting &amp; Licensing</a>
                      <a title="Jobs"  href="#">Jobs</a>
                      <a title="Municipal Marketing"  href="#">Municipal Marketing</a>
                      <a title="Our City. Our Safety."  href="#">Our City. Our Safety.</a>
                      <a title="Safety"  href="#">Safety</a>
                      <a title="Sustain Chicago" target="_blank"  href="#">Sustain City</a>
                      <a title="Taxes"  href="#">Taxes</a>
                      <a title="Technology"  href="#">Technology</a>
                      <a title="Transparency"  href="#">Transparency</a>
                      <a title="Transportation"  href="#">Transportation</a>												
                      </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li>
                  <button className="cds-accordion-button cds-nav-link" aria-expanded="false" aria-controls="nav-5">
                    <span>Government</span>
                  </button>
                  <ul id="nav-5" className="cds-nav-submenu" aria-hidden="true">
                      <li><a href="#">Page title</a></li>
                      <li><a href="#">Page title one</a></li>
                      <li><a href="#">Page title two</a></li>
                      <li><a href="#">Link</a></li>
                  </ul>
                </li>
      
                <li>
                  <button className="cds-accordion-button cds-nav-link" aria-expanded="false" aria-controls="nav-about">
                    <span>About</span>
                  </button>
                  <ul id="nav-about" className="cds-nav-submenu" aria-hidden="true">
                      <li><a title="Chicago History"  href="#">City History</a></li>
                      <li><a title="Facts &amp; Statistics"  href="#">Facts &amp; Statistics</a></li>
                      <li><a title="Attractions"  href="#"target="_blank">Attractions</a></li>       
                  </ul>
                </li>
             </ul>		
            <div className="cds-nav-secondary">
              <ul className="cds-unstyled-list cds-nav-secondary-links">
                <li><a href="#"><span>Accessibility </span></a></li>
                <li>
                  <a href="#">
                    External link
                  </a>
                </li>
              </ul>
            </div>
      
            </div>
          </nav>
        </header>
    );
  }
}

export default Header;
