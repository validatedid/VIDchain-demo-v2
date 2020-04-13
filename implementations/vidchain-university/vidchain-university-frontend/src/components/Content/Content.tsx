import React, { Component } from "react";
import "./Content.css";


class Content extends Component {

    loginWithVIDChain(){
        
    }


  render() {
    return (
    <div className= "content">
        <div className="login_form">
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
        </div>
        </div>
    );
  }
}

export default Content;
