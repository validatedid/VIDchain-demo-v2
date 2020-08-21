import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router-dom";

interface ILoginProps {
	history?: any;
}
  
interface ILoginState {
}
class Login extends Component<ILoginProps, ILoginState> {

    
    loginWithVIDChain(){
        this.props.history.push("/CV"); 
    }


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

		<section className="login-wrapper">
			<div className="container">
				<div className="col-md-6 col-sm-8 col-md-offset-3 col-sm-offset-2">
					<form>
						<img className="img-responsive" alt="logo" src={require("../../assets/images/logo.png")} />
                        <div className="sign_in_vidchain">
                            <a className="btn btn-default" href="#" role="button" onClick={() => this.loginWithVIDChain()}><i className="fa fa-check-square-o"></i>Sign in with ViDChain</a>
                        </div>
                        
						<input type="text" className="form-control input-lg" placeholder="User Name" />
						<input type="password" className="form-control input-lg" placeholder="Password"/>
						<label><a href="">Forget Password?</a></label>
						<button type="submit" className="btn btn-primary">Login</button>
						<p>Have't Any Account <a href="">Create An Account</a></p>
					</form>
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
						<input type="text" className="form-control input-lg" placeholder="Your Name"/>
						<input type="text" className="form-control input-lg" placeholder="Email..."/>
						<textarea className="form-control" placeholder="Message"></textarea>
						<button type="submit" className="btn btn-primary">Login</button>
					</form>
				</div>
				
				
			</div>
			<div className="copy-right">
			 <p>&copy;Copyright 2018 Jober Desk | Design By <a href="https://themezhub.com/">ThemezHub</a></p>
			</div>
		</footer>
        {/* <div className="login_form">
            <div className="sign_in_vidchain">
                <a className="btn btn-default" href="#" role="button" onClick={() => this.loginWithVIDChain()}><i className="fa fa-check-square-o"></i>Sign in with ViDChain</a>
            </div>
            <div className="login_manual_form">
                <p>or</p>
                <form action="#" method="post">
                    <div className="form-group">
                        <i className="fa fa-user"></i>
                        <input type="text" name="username" id="user" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                        <input type="password" name="username" id="pass" placeholder="Password" />
                    </div>
                        <button type="submit" className="btn btn-default" id="login_submit">Sign in</button>
                </form> 
                <div className="forget_pass one">
                    <a href="#"><i className="fa fa-question-circle" aria-hidden="true"></i>Forget Password</a>
                </div>
                <div className="forget_pass">
                    <a href="register.html"><i className="fa fa-user-plus" aria-hidden="true"></i>Didn't have a account? Register</a>
                </div>
            </div>
        </div> */}
        </div>
    );
  }
}

export default Login;
