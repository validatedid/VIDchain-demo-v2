import React, { Component } from 'react';
import logo from './logo.svg';
import './Profile.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Official from '../../components/Official/Official';

interface Props {
	did: string;
	location: any;
}
  
interface State {

}
class Profile extends Component<Props,State> {

	constructor(props:any) {
		super(props);
	}
  componentDidMount(){
	var did = this.props.location.state.did;
	console.log("in Registration");
	console.log(did);
  }
  loginWithVIDChain(){
    
  }

  render() {
	var did = this.props.location.state.did;  
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
						<h4>DID</h4>
						<p>{did}</p>
					</div>
					<div className="form-row">
						<h4>Name</h4>
						<input type="text" className="form-control" placeholder="Name" />
					</div>
					<div className="form-row">
						<h4>Surname</h4>
						<input type="text" className="form-control" placeholder="Surname" />
					</div>
					<div className="form-row">
						<h4>Date Of Birth</h4>
						<input type="text" className="form-control" placeholder="YYYY-MM-DD" />
					</div>
					<div className="form-row">
						<h4>Place Of Birth</h4>
						<input type="text" className="form-control" placeholder="Place of Birth" />
					</div>
					<div className="form-row">
						<h4>Phone</h4>
						<input type="text" className="form-control" placeholder="Phone" />
					</div>
					<div className="form-row">
						<h4>Current Address</h4>
						<input type="text" className="form-control" placeholder="Current Address" />
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

export default Profile;
