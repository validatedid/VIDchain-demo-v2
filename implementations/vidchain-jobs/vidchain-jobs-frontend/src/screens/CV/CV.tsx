import React, { Component } from "react";
import "./CV.css";


class CV extends Component {



  render() {
    return (
        <div className= "content">
            <nav className="navbar navbar-default navbar-sticky bootsnav">
                <div className="container">      
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                            <i className="fa fa-bars"></i>
                        </button>
                        <a className="navbar-brand" href="index.html"><img src={require("../../assets/images/logo.png")} className="logo" alt=""/></a>
                    </div>

                    <div className="collapse navbar-collapse" id="navbar-menu">
                        <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                                <li><a href="index.html">Home</a></li> 
                                <li><a href="login.html">Login</a></li>
                                <li><a href="companies.html">Companies</a></li> 
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Browse</a>
                                    <ul className="dropdown-menu animated fadeOutUp" style={{display: "none", opacity: 1}}>
                                        <li className="active"><a href="browse-job.html">Browse Jobs</a></li>
                                        <li><a href="company-detail.html">Job Detail</a></li>
                                        <li><a href="resume.html">Resume Detail</a></li>
                                    </ul>
                                </li>
                            </ul>
                    </div>
                </div>   
                </nav>

                <section className="inner-banner banner">
                <div className="container">
                    <div className="caption">
                        <h2>Get your jobs</h2>
                        <p>Get your Popular jobs <span>202 New job</span></p>
                    </div>
                </div>
                </section>


                <section className="profile-detail">
                <div className="container">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="basic-information">
                                <div className="col-md-3 col-sm-3">
                                <img src={require("../../assets/images/user.jpg")} alt="" className="img-responsive"/>
                                </div>
                                <div className="col-md-9 col-sm-9">
                                    <div className="profile-content">
                                            <h2>Daniel Duke<span>Web designer</span></h2>
                                            <p>Soft Techi Infoteck Pvt.</p>
                                            <ul className="information">
                                                <li><span>Name:</span>Daniel Duke</li>
                                                <li><span>Email:</span>daniel-duke@gmail.com</li>
                                                <li><span>Mobile:</span>+91 548 576 8579</li>
                                                <li><span>Company:</span>Soft Techi Infoteck Pvt.</li>
                                                <li><span>Date of Birth:</span>10 July 1990</li>
                                            </ul>
                                        </div>
                                    </div>
                                <ul className="social">
                                    <li><a href="" className="facebook"><i className="fa fa-facebook"></i>Facebook</a></li>
                                    <li><a href="" className="google"><i className="fa fa-google-plus"></i>Google Plus</a></li>
                                    <li><a href="" className="twitter"><i className="fa fa-twitter"></i>Twitter</a></li>
                                    <li><a href="" className="linkedin"><i className="fa fa-linkedin"></i>Linked In</a></li>
                                    <li><a href="" className="instagram"><i className="fa fa-instagram"></i>Instagram</a></li>
                                </ul>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <i className="fa fa-user fa-fw"></i> About Me
                                    </div>
                               
                                    <div className="panel-body">
                                    <p>The front end is the part that users see and interact with, includes the User Interface, the animations, and usually a bunch of logic to talk to the backend. It is the visual bit that the user interacts with. This includes the design, images, colours, buttons, forms, typography, animations and content. It’s basically everything that you as a user of the website can see.</p>	
                                    </div>
                                </div>
                                
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <i className="fa fa-leaf fa-fw"></i> Responsibilities:
                                    </div>
                                                     
                                    <div className="panel-body">
                                    <p>The front end is the part that users see and interact with, includes the User Interface, the animations, and usually a bunch of logic to talk to the backend. It is the visual bit that the user interacts with.</p>	
                                    <ul>
                                        <li>Software testing in a Web Applications/Mobile environment.</li>
                                        <li>Software Test Plans from Business Requirement Specifications for test engineering group.</li>
                                        <li>Software testing in a Web Applications environment.</li>
                                        <li>Translate designs into responsive web interfaces</li>
                                        <li>Software testing in a Web Applications/Mobile environment.</li>
                                        <li>Software testing in a Web Applications environment.</li>
                                        <li>Translate designs into responsive web interfaces</li>
                                        <li>Software Test Plans from Business Requirement Specifications for test engineering group.</li>
                                        <li>Run production tests as part of software implementation; Create, deliver and support test plans for testing group to execute.</li>
                                        <li>Run production tests as part of software implementation; Create, deliver and support test plans for testing group to execute.</li>
                                    </ul>
                                    </div>
                                </div>
                                
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <i className="fa fa-cog fa-fw"></i> Skills
                                    </div>
                                                   
                                    <div className="panel-body">
                                    <p>The front end is the part that users see and interact with, includes the User Interface, the animations, and usually a bunch of logic to talk to the backend.</p>	
                                    <span className="service-tag">Web Design</span>
                                    <span className="service-tag">Graphics</span>
                                    <span className="service-tag">Development</span>
                                    <span className="service-tag">App design</span>
                                    <span className="service-tag">IOS Apps</span>
                                    <span className="service-tag">CMS Development</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </section>

   
                <footer>
                <div className="container">
                    <div className="col-md-3 col-sm-6">
                        <h4>Featured Job</h4>
                        <ul>
                            <li><a href="#">Browse Jobs</a></li>
                            <li><a href="#">Premium MBA Jobs</a></li>
                            <li><a href="#">Access Database</a></li>
                            <li><a href="#">Manage Responses</a></li>
                            <li><a href="#">Report a Problem</a></li>
                            <li><a href="#">Mobile Site</a></li>
                            <li><a href="#">Jobs by Skill</a></li>
                        </ul>
                    </div>
                    
                    <div className="col-md-3 col-sm-6">
                        <h4>Latest Job</h4>
                        <ul>
                            <li><a href="#">Browse Jobs</a></li>
                            <li><a href="#">Premium MBA Jobs</a></li>
                            <li><a href="#">Access Database</a></li>
                            <li><a href="#">Manage Responses</a></li>
                            <li><a href="#">Report a Problem</a></li>
                            <li><a href="#">Mobile Site</a></li>
                            <li><a href="#">Jobs by Skill</a></li>
                        </ul>
                    </div>
                    
                    <div className="col-md-3 col-sm-6">
                        <h4>Reach Us</h4>
                        <address>
                        <ul>
                        <li>1201, Murakeu Market, QUCH07<br/>
                        United Kingdon</li>
                        <li>Email: Support@job.com</li>
                        <li>Call: 044 123 458 65879</li>
                        <li>Skype: job@skype</li>
                        <li>FAX: 123 456 85</li>
                        </ul>
                        </address>
                    </div>
                    
                    <div className="col-md-3 col-sm-6">
                        <h4>Drop A Mail</h4>
                        <form>
                            <input type="text" className="form-control input-lg" placeholder="Your Name" />
                            <input type="text" className="form-control input-lg" placeholder="Email..." />
                            <textarea className="form-control" placeholder="Message"></textarea>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                    
                    
                </div>
                <div className="copy-right">
                <p>&copy;Copyright 2018 Jober Desk | Design By <a href="https://themezhub.com/">ThemezHub</a></p>
                </div>
                </footer>
            
        </div>
    );
  }
}

export default CV;
