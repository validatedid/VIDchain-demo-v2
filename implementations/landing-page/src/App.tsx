import React from 'react';
import logo from './logo.svg';
import Timeline from './components/Timeline';
import './App.css';

const logoVidchain = require("./assets/images/VIDchain_horizontal.png");
const logoValidated = require("./assets/images/validated_white.png");
const logoNotification = require("./assets/images/VIDchain_vertical.png");
const logoIOS = require("./assets/images/appleAppStore@3x.png");
const logoAndroid = require("./assets/images/playStore@3x.png");
const logoUniversity = require("./assets/images/logo_uni.png");
const logoGovernment = require("./assets/images/logoCity.png");

function App() {
  return (
    <html>
    <body className="step-body-background">
    <main>
      <img className="logo" src={logoVidchain} />
      <div className="grid-main-content custom-container">
        
        {/* <div className="live-products-header">
          <h4>Welcome to VIDchain demo site!</h4>
          <p>Test the latest demo, downloading our app and using it following the instructions.</p>
        </div> */}
        <Timeline />
        <div className="step-body">
          <div className="center">
            <a className="desktop_start" href="faber.html">
              <div className="desktop_start_btn">Start Tutorial</div>
            </a>
            <a className="mobile_start" href="faber.html">
              <div className="mobile_start_btn">Start Tutorial</div>
            </a>
          </div>
          <h2>Getting Started with Connect.Me</h2>
          <p>
            This is an optional tutorial designed to show you what digital
            credentials are, and how using Connect.Me can simplify, speed up and
            secure your online interactions.
          </p>

          <p>
            If you don't already have Connect.Me installed, download it now to
            your mobile phone.
          </p>
        </div>
        <div className="links" style={{height: "96px"}}>
          <img src={logoNotification} style={{marginRight: "20px", width:"120px"}} />
          <div className="playstore">
            <a id="x" href="https://itunes.apple.com">
              <img src={logoIOS}style={{width:"121px",marginRight: "20px"}} />
            </a>
            <a href="https://play.google.com/store/">
              <img src={logoAndroid} style={{width:"121px"}} />
            </a>
          </div>
        </div>
        <img className="step1_mobile" style={{marginBottom: "0px",width: "269px"}} src="./img/a-m@3x.png" alt="" />

        <p className="clearfix" style={{marginTop: "24px", color: "#393939", fontSize: "17px"}}>
          The tutorial consists of three parts:
        </p>
        <div className="step step-body">
          <div>
            <h3 className="heading">Part 1 - Faber College</h3>
            <p className="has-image-right">
              Imagine you are just graduating at Faber College. Imagine they
              offered you a way to prove your transcripts digitally and
              anonymously, by offering you a cryptographic copy of your
              transcripts. To hold them, you first need a digital wallet like
              the one Connect.Me uses. Then, you will need to privately
              'connect' with Faber College to receive your transcripts.
            </p>
          </div>
          <img src={logoGovernment} style={{width: "200px", height:"200px"}} />
        </div>
        <div className="step step-body">
          <div>
            <h3 className="heading">Part 2 - ACME Corporation</h3>
            <p className="has-image-right">
              Say you want to apply for a job at ACME Corp- and naturally they
              are asking for a lot of personal information along with proof of
              your degree. First, as before, you add ACME Corp as a connection,
              and then over that secure relationship you can share proof of your
              transcript you received from Faber College!
            </p>
          </div>
          <img src={logoUniversity} style={{height:"200px", width:"200px"}} />
        </div>

        <div className="step-body">
          <p>
            The power of digital credentials done right is almost always
            understated. At Evernym we believe Connect.Me represents a way for
            individuals to truly, literally be at the center for their online
            interactions for the first time. All your verified information
            collected in Connect.Me stays with you. Built on Hyperledger Indy's
            open-source code, we aim to ensure you always remain
            'self-sovereign'. That is, to be free to take your digital things
            and leave Connect.me and use a different digital wallet app if you
            wish. That's the spirit of Self-Sovereign Identity! It's like being
            able to change your email provider, but take with you all of your
            data, contacts, history and even your same email address with you.
            You just change providers.
          </p>
          <p>Welcome to the world of self-sovereign identity.</p>
        </div>
        
      </div>
    </main>
    <iframe width="100%" height="810" src="https://www.youtube.com/embed/eRxVWeX389w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div className="center">
          <a className="desktop_start" href="faber.html">
            <div className="desktop_start_btn">Start Tutorial</div>
          </a>
          <a className="mobile_start" href="faber.html">
            <div className="mobile_start_btn">Start Tutorial</div>
          </a>
        </div>
    </body>

    <footer id="footer">
   
          <h2 style={{fontFamily: "TTNorm-Regular", marginLeft: "0px"}}>Powered by:</h2>
          <a href="https://www.validatedid.com">
            <img className="logoValidated" src={logoValidated} alt="ValidatedID" />
          </a>
          <br/>
          <p style={{float: "right"}}>Copyright 2020, Validated ID, S.L.</p>
    </footer>
    </html>
  


  );
}


export default App;
