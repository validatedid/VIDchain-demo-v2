import React, { Component } from "react";
import "./Official.css";


class Official extends Component {


  render() {
    return (
        <div className='site-trust-seal'>
        <div className='trust-seal-link container'>
          <div className='row'>
              <div className='col ml-2 trust-seal-link-container'  data-toggle="collapse" data-target="#trust-seal-content" role="button"
                aria-expanded="false" aria-controls="trust-seal-content">
                  <img src='https://webapps1.chicago.gov/cdn/chiwds/0.9.1/img/safari-pinned-tab.svg' className='trust-seal-flag' title='Flag' />
                  <div>
                    <span>This is not an official website of the City of Barcelona</span>
                    <button className="trust-seal-action" title='Here’s how you know' 
                        data-target="#trust-seal-content" role="button"
                        data-toggle="collapse" 
                        aria-expanded="false" aria-controls="trust-seal-content">
                      <span>what is this?</span>
                    </button>	
                  </div>										
              </div>
          </div>
        </div>
        <div className='trust-seal-content collapse container mt-4' aria-hidden='true' id='trust-seal-content'>
          <div className='row'>
            <div className='col-sm-6'>
              <div className="media">
                  <img className="mr-3 trust-seal-icon" src="https://webapps1.chicago.gov/cdn/chiwds/0.9.1/img/icon-dot-gov.svg" alt="Generic placeholder image" />
                  <div className="media-body">
                    <h5 className="mt-0">Demo.</h5>
                    This is Municipal government website to demo the generation of a Membership credential.
                  </div>
              </div>
            </div>
            <div className='col-sm-6'>
              <div className="media">
                  <img className="mr-3 trust-seal-icon" src="https://webapps1.chicago.gov/cdn/chiwds/0.9.1/img/icon-https.svg" alt="Generic placeholder image" />
                  <div className="media-body">
                    <h5 className="mt-0">Mobile App</h5>
                    Download the app from https://demo.vidchain.net/home and start the flow.
                  </div>
              </div>						
            </div>					
          </div>								
        </div>					
      
      </div>
    );
  }
}

export default Official;
