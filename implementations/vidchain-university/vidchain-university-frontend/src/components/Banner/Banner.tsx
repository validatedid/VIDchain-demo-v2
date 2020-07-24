import React, { Component } from "react";
import "./Banner.css";


class Banner extends Component {


  render() {
    return (
        <div>
            <section id="banner">
              <div id="main-slider" className="flexslider">
                  <ul className="slides">
                    <li>
                      <img src={require("../../assets/images/slides/1.jpg")} alt="" />
                      <div className="flex-caption">
                          <h3>Quality Education</h3> 
                <p>We Teach Students for Sucessful Fututre</p> 
                
                      </div>
                    </li>
                    <li>
                      <img src={require("../../assets/images/slides/2.jpg")} alt="" />
                      <div className="flex-caption">
                          <h3>Learn to be Sucessful</h3> 
                <p>Shaping the future</p> 
                
                      </div>
                    </li>
                  </ul>
              </div>
        </section> 
       				
      
      </div>
    );
  }
}

export default Banner;
