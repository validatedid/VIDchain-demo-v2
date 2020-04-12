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
              <a href="/design-system-site/" title="Home">
                <img src={require("../../assets/images/logo_barcelona.svg")} alt="Logo of the City of Barcelona" />
                <h1 className="cds-header-title">Barcelona</h1>
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
                  <a className="cds-nav-link" href="/design-system-site/"><span>Home</span></a>
                </li>
                <li>
                  <button className="cds-accordion-button cds-nav-link" aria-expanded="false" aria-controls="nav-pi">
                    <span>Programs & Initiatives</span>
                  </button>
                  <div id="nav-pi" className="cds-nav-submenu cds-nav-megamenu row"  aria-hidden="true">
                    <div className="col-md-6">
                      <ul>							 					
                      <li>
                      <a title="Affordable Chicago" href="https://www.chicago.gov/city/en/progs/affordchic.html">Affordable Chicago</a>
                      <a title="Chicago Census 2020" href="/contenthttps://www.chicago.gov/city/en/sites/census2020/home.html">Chicago Census 2020</a>
                      <a title="Consumer Protection" href="https://www.chicago.gov/city/en/progs/protect.html">Consumer Protection</a>
                      <a title="Education" href="https://www.chicago.gov/city/en/progs/edu.html">Education</a>
                      <a title="Environment" href="https://www.chicago.gov/city/en/progs/env.html">Environment</a>
                      <a title="Food Service Establishments" href="https://www.chicago.gov/city/en/ofinterest/bus/food.html">Food Service Establishments</a> 
                      <a title="Freedom of Information (FOIA)" href="https://www.chicago.gov/city/en/progs/foia.html">Freedom of Information (FOIA)</a>
                      <a title="Grants" href="https://www.chicago.gov/city/en/progs/grants.html">Grants</a>
                      <a title="Grounds for Peace" href="https://www.chicago.gov/city/en/progs/grounds_for_peace.html">Grounds for Peace</a>
                      <a title="Health &amp; Wellness" href="https://www.chicago.gov/city/en/progs/health.html">Health &amp; Wellness</a>
                      <a title="Housing" href="https://www.chicago.gov/city/en/depts/doh.html">Housing</a>
      
                      </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul>
                      <li>
                      <a title="Inspections, Permitting &amp; Licensing" href="https://www.chicago.gov/city/en/progs/inspectionspermitting.html">Inspections, Permitting &amp; Licensing</a>
                      <a title="Jobs" href="https://www.chicago.gov/city/en/progs/emp.html">Jobs</a>
                      <a title="Municipal Marketing" href="https://www.chicago.gov/city/en/progs/municipal_marketing.html">Municipal Marketing</a>
                      <a title="Our City. Our Safety." href="https://www.chicago.gov/summer">Our City. Our Safety.</a>
                      <a title="Safety" href="https://www.chicago.gov/city/en/progs/safety.html">Safety</a>
                      <a title="Sustain Chicago" target="_blank" href="https://sustainchicago.cityofchicago.org/">Sustain Chicago</a>
                      <a title="Taxes" href="https://www.chicago.gov/city/en/progs/tax.html">Taxes</a>
                      <a title="Technology" href="https://www.chicago.gov/city/en/progs/tech.html">Technology</a>
                      <a title="Transparency" href="https://www.chicago.gov/city/en/progs/transparency.html">Transparency</a>
                      <a title="Transportation" href="https://www.chicago.gov/city/en/progs/trnsprt.html">Transportation</a>												
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
                      <li><a title="Chicago History" href="https://www.chicago.gov/city/en/about/history.html">Chicago History</a></li>
                      <li><a title="Facts &amp; Statistics" href="https://www.chicago.gov/city/en/about/facts.html">Facts &amp; Statistics</a></li>
                      <li><a title="Attractions" href="https://www.choosechicago.com/" target="_blank">Attractions</a></li>       
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
