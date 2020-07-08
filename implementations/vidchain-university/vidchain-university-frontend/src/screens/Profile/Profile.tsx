import React, { Component } from "react";
import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import Footer from "../../components/Footer/Footer";
import "./Profile.css";
import * as utils from "../../utils/utils";
import * as vidchain from "../../apis/vidchain";
import { IPresentation } from "../../interfaces/IPresentation";
import io from 'socket.io-client';
import { Button } from "react-bootstrap";

interface Props {
	did: string;
	jwt: string;
	history?: any;
	location: any;
}

interface State {
	access_token: string,
   refresh_token: string,
   id_token: string,
   did: string,
   firstName: string;
   lastName: string;
   dateOfBirth: string;
   placeOfBirth: string;
   currentAddress: string;
   city: string;
   state: string;
   zip: string;
   gender: string;
   today: string,
   successGeneration: boolean,
   sw: boolean,
   bigdata: boolean,
   enrolement: boolean,
   credential: boolean,
   error: boolean
}

class Profile extends Component<Props,State> {

  constructor(props:any) {
      super(props);
      this.state = {
			access_token: "",
         refresh_token: "",
         id_token: "",
         did: utils.getUserDid(this.props.location.state.id_token),
         firstName: "",
         lastName: "",
         dateOfBirth: "",
         placeOfBirth: "",
         currentAddress: "",
         city: "",
         state: "",
         zip: "",
         gender: "",
         today: "",
         successGeneration: false,
         sw: false,
         bigdata: false,
         enrolement: false,
         credential: false,
         error: false		
		}
    this.initiateSocket();	
  }
  
  componentDidMount(){
    this.getCurrentDay();
		if(this.props.location.state){
         this.setState ({
            access_token: this.props.location.state.access_token,
            refresh_token: this.props.location.state.refresh_token,
            id_token: this.props.location.state.id_token,
            did: utils.getUserDid(this.props.location.state.id_token),
            //TODO: Remove hardcoded and retrieve attributes from presentation	
            firstName: "Mauro",
            lastName: "Lucchini",
            dateOfBirth: "05/02/1993",
            placeOfBirth: "Barcelona",
            currentAddress: "Pitfield 64",
            city: "El Masnou",
            state: "Barcelona",
            zip: "08320",
            gender: "Male",
         });
    }
  }
  
  getCurrentDay(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.setState ({
      today: dd + '/' + mm + '/' + yyyy
    });
  }
  
  async initiateSocket(){
    const socket = io('/', {
      path: '/universityws',
      transports: ['websocket']
    });
    socket.on('presentation', (msg: any) => {
      console.log("socket.on('presentation')");
      console.log(msg);
      this.setState ({
				credential: true
			})
    });
  }

  async claimVP(course:string){
    const presentation: IPresentation = {
		target: this.state.did,
		name: course,
		type: [
			[
				"VerifiableCredential",
				"VerifiableIdCredential"
			]
		],
   }
   console.log("Check presentation:");
   console.log(presentation);
   const token = await vidchain.getAuthzToken();
   const response = await vidchain.requestVP(token, presentation);
   console.log(response)
	//Check response
	if(response !== "Error"){
      if(course == "Software Engineering Degree"){
         this.setState ({
            sw:true
         })
      }else{
         this.setState ({
            bigdata:true
         })
      }
		this.setState ({
         enrolement: true
		})
	}
	else{
		this.setState ({
			error: true
		})
  }
  
  }
  
  getDiploma(){
   const { history } = this.props;
   const { access_token,refresh_token,id_token, sw, bigdata } = this.state;
   history.push(
      {
        pathname: '/diploma',
        state: { 
         access_token: access_token,
         refresh_token: refresh_token,
         id_token: id_token,
         sw: sw,
         bigdata: bigdata
         }
      }
     ); 
}
  render() {
    const { did, firstName, lastName, dateOfBirth, placeOfBirth, currentAddress, city, state, zip} = this.state;
      return ( 
      <div>
<HeaderLogin></HeaderLogin>
   <div className="fullContent">
      <section id="inner-headline">
         <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="pageTitle">Student's Portal</h2>
              </div>
            </div>
         </div>
      </section>
      <section id="content">
         <div className="container">
            <div className="row">
               <div className="col-md-12">
                  <div className="about-logo">
                     <h3>Welcome to the Student's Portal</h3>
                     <p>Here you can check your profile details and manage your activity within the university.</p>
                  </div>
               </div>
            </div>
            <div className="wrapper">
                  <div className="inner">
                     <div className="image-holder">
                        <img className="imageSoftware" src={require("../../assets/images/software_engineer.png")} alt=""/>
                     </div>
                     <form action="">
                        <div className="form-row">
                           <h4><b>Enroled courses</b></h4>
                        </div>
                        <br/>
                        <div className="form-row">
                           <h4>Name</h4>
                           <p>Bachelor's in Software Engineering</p>
                        </div>
                        <br></br>
                        <div className="form-row">
                           <h4>Description</h4>
                           <p>The bachelor’s degree in Software Engineering provides the knowledge needed to conceive, design, develop, maintain and manage computer systems, services, applications and architectures and to understand and apply relevant legislation. You will also become an expert in new methods and technologies in the field of ICTs. </p>
                        </div>
                        <br/>
                        <div className="form-row">
                           <h4>Institution</h4>
                           <p>University of Barcelona - Computer Science Department</p>
                        </div>
                        <br/>
                        
                     </form>
                     <form action="">
                     </form>
                  </div>
               </div>
            <div className="row">
               <div className="wrapper">
                  <div className="inner">
                     <div className="image-holder">
                        <img className="imageSoftware" src={require("../../assets/images/studentlogo.png")} alt=""/>
                     </div>
                     <form action="">
                        <div className="form-row">
                           <h4><b>Your Profile</b></h4>
                        </div>
                        <br/>
                        <div className="form-row">
                           <h4>Course details - remove adjust</h4>
                           <p>The bachelor’s degree in Software Engineering provides the knowledge needed to conceive, design, develop, maintain and manage computer systems, services, applications and architectures and to understand and apply relevant legislation. You will also become an expert in new methods and technologies in the field of ICTs. </p>
                        </div>
                        <div className="form-row">
                          <h4>DID</h4>
                          <p>{did}</p>
                        </div>
                        <div className="form-row">
                          <h4>Full name:</h4>
                          <p>{firstName}&nbsp;{lastName}</p>
                        </div>
                        <div className="form-row">
                          <h4>Birth:</h4>
                          <p>{dateOfBirth}&nbsp;-&nbsp;{placeOfBirth}</p>
                        </div>
                        <div className="form-row">
                          <h4>Address:</h4>
                          <p>{currentAddress},&nbsp;{city}&nbsp;-&nbsp;{state}&nbsp;({zip})</p>
                        </div>
                        <Button type="button" className="collect-button" onClick={() =>this.claimVP("Software Engineering Degree")}><b>Get student card credential</b></Button>
                     </form>
                     <form action="">
                     </form>
                  </div>
               </div>
               
               <div className="wrapper">
                  <div className="inner">
                     <div className="image-holder">
                        <img className="imageSoftware" src={require("../../assets/images/familiar.svg")} alt=""/>
                     </div>
                     <form action="">
                        <div className="form-row">
                           <h4><b>Large family? Get a discount on your student fee!</b></h4>
                        </div>
                        <br/>
                        <div className="form-row">
                           <h4>Description</h4>
                           <p>Our university is commited to provide opportunities to everyone. Therefore, this university is eager to support Large Families and for that reason, all the students who are titled Large Family will have a 25% discount in student's fees. Do not miss the opportunity to present your credentials before finishing the course. </p>
                        </div>
                        <br/>
                        <div className="form-row">
                           <h4>Requirements</h4>
                           <p>In order to get this discount in your students fees, you will have to prove you are in a Large Family. </p>
                           <p><b>Present your Large Family Card Credential</b> issued by your city council.</p>
                        </div>
                        <br/>
                        <Button type="button" className="collect-button" onClick={() =>this.claimVP("Big Data Degree")}><b>Apply for a discount</b></Button>
                     </form>
                     <form action="">
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </section>
   </div>
   <Footer></Footer>
</div>
    );
  }
}

export default Profile;
