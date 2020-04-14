import React, { Component } from 'react';
import logo from './logo.svg';
import './Registration.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';

class Registration extends Component {

  loginWithVIDChain(){
    
  }

  render() {
    return (
    <div>
    <Official></Official>
    <Header></Header>
    <div className= "content">
        <div className="wrapper">
			<div className="inner">
				<div className="image-holder">
					<img src={require("../../assets/images/IMG_1103.jpg")} alt=""/>
				</div>
				<form action="">
					<h3>Generate your ID</h3>
					<div className="form-row">
						<input type="text" className="form-control" placeholder="Name" />
					</div>
					<div className="form-row">
						<input type="text" className="form-control" placeholder="Surname" />
					</div>
					<div className="form-row">
						<input type="text" className="form-control" placeholder="Phone" />
					</div>
					
					<button className="custom-button">Claim your credential
						<i className="zmdi zmdi-long-arrow-right"></i>
					</button>
				</form>
				
			</div>
		</div>
    </div>
    <div className="footer">
      <Footer></Footer>
    </div>

    </div>
    
    );
  }
}

export default Registration;
