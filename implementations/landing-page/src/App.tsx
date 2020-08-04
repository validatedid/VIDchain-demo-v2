import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <body className="step-body-background">
    <main>
      <div className="live-products-header">
        <a href="https://www.evernym.com/plans/">
          Ready to try this for for real?
          <span>Check out our live products</span>
        </a>
      </div>
      <div className="grid-main-content custom-container">
        <img className="logo" src="img/Group2@3x.png" />
        <img className="step1_desktop" src="img/a@3x.png" />
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
          <img src="img/CMicon@3x.png" style={{marginRight: "20px", width:"96px"}} />
          <div className="playstore">
            <a id="x" href="https://itunes.apple.com/us/app/connect-me/id1260651672?mt=8">
              <img src="img/appleAppStore@3x.png" style={{width:"121px",marginRight: "20px"}} />
            </a>
            <a href="https://play.google.com/store/apps/details?id=me.connect&amp;hl=en">
              <img src="img/playStore@3x.png" style={{width:"121px"}} />
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
          <img src="img/faberLogo2@3x.png" style={{width: "150px", height:"90px"}} />
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
          <img src="img/ACMELogo@3x.png" style={{height:"83px", width:"230px"}} />
        </div>
        <div className="step step-body">
          <div>
            <h3 className="heading">Part 3 - Thrift Bank</h3>
            <p className="has-image-right">
              Now armed with both your college transcripts and proof of
              employment in your Connect.Me wallet, say you want to apply for an
              auto loan at Thrift Bank. Thrift will ask you for proof of
              employment and salary, as well as some information contained in
              your college transcripts. Connect.Me will auto-fill the requested
              information and disclose it to Thrift Bank at your authorization.
              It is done privately, securely and within seconds.
            </p>
          </div>
          <img src="img/ThriftLogo@3x.png" style={{height:35 ,width:"239px"}} />
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
        <div className="center">
          <a className="desktop_start" href="faber.html">
            <div className="desktop_start_btn">Start Tutorial</div>
          </a>
          <a className="mobile_start" href="faber.html">
            <div className="mobile_start_btn">Start Tutorial</div>
          </a>
        </div>
      </div>
    </main>

    <footer id="footer">
      <div className="container">
        <section>
          <h4 className="logo-title">
            Connect.Me is built by
            <a href="https://www.evernym.com">Evernym</a>, and is an integral
            part of the Verity Credential Exchange product.
          </h4>
          <a href="https://www.evernym.com">
            <img className="logo logo-evernym" src="https://www.connect.me/images/logo-evernym.svg" alt="Evernym" />
          </a>
          <p>
            <a href="https://www.connect.me/privacy.html">Privacy Policy</a>
          </p>
          <br />
          <p>© Copyright 2018, Evernym Inc. All Rights Reserved.</p>
          <p>Connect.Me is a registered trademark of Evernym Inc.</p>
        </section>

        <section>
          <h4 className="logo-title">Powered by Sovrin</h4>
          <a href="https://sovrin.org">
            <img className="logo logo-sovrin" src="https://www.connect.me/images/logo-sovrin.svg" alt="Sovrin" />
          </a>
          <h4 className="logo-title">Using Hyperledger Indy at its core</h4>
          <a href="https://www.hyperledger.org/projects/hyperledger-indy">
            <img className="logo logo-hyperledger-indy" src="https://www.connect.me/images/logo-hyperledger-indy.png" alt="Hyperledger Indy" />
          </a>
        </section>
      </div>
    </footer>
  

</body>
  );
}


export default App;
