import React, { Component } from 'react';
import './Main.css';
import * as config from "../../config/config";
import ReactHtmlParser from 'react-html-parser';
import iphone from "../../assets/images/f11a0677-iphone-walet_10000000ex0tt000004028.png";
import spinnerFull from "../../assets/images/fe38d7b7-recurso-4.svg";
import spinnerHalf from "../../assets/images/3a24678c-recurso-2.svg";
import spinnerQuarter from "../../assets/images/e9f173fc-recurso-3.svg";
import logoVidchain from "../../assets/images/3531224b-vidchain.svg";
import logoGooglePlay from "../../assets/images/a6acde6a-google-play.svg";
import logoIOS from "../../assets/images/b6b7988d-app-store.svg";


const htmlString = `
      <div class="lp-element lp-pom-root" id="lp-pom-root">
         <div id="lp-pom-root-color-overlay"></div>
         <div class="lp-positioned-content">
            <div class="lp-element lp-pom-text nlh" id="lp-pom-text-9">
               <h1 style="line-height: 50px;"><span style="font-style: normal;"><span style="font-weight: 700;"><span style="font-family: Raleway;"><span style="font-size: 48px; color: rgb(234, 232, 241);">Your ID wallet,</span></span></span></span></h1>
               <p><span style="font-style: normal;"><span style="font-weight: 700;"><span style="font-family: Raleway;"><span style="font-size: 48px; color: rgb(234, 232, 241);">simple and secure</span><span style="font-size: 48px; color: rgb(255, 255, 255);"><br></span></span></span></span></p>
            </div>
            <div class="lp-element lp-pom-text nlh" id="lp-pom-text-10">
               <p style="line-height: 26px;"><span style="font-family: Raleway; font-weight: 500; font-style: normal; font-size: 16px; color: rgb(234, 232, 241);">VIDchain is a service designed for helping you to regain control over your digital identity and to exchange digital credentials in a secure and private way.&nbsp;</span><span style="color: rgb(234, 232, 241);"><span style="font-family: Raleway; font-weight: 500; font-style: normal; font-size: 16px;">Your info always with you!</span></span></p>
               <p style="line-height: 26px;"><span style="font-family: Raleway; font-weight: 500; font-style: normal; font-size: 16px; color: rgb(234, 232, 241);">Come on, get familiar with it. But first, make sure you have downloaded the VIDchain app on your phone.</span><span style="font-family: &quot;PT Serif&quot;; font-weight: 400; font-style: normal; font-size: 16px; color: rgb(255, 255, 255);"><br></span></p>
            </div>
            <div class="lp-element lp-pom-text nlh" id="lp-pom-text-87">
               <p style="line-height: 18px;"><span style="font-style: normal;"><span style="font-weight: 500;"><span style="font-family: Raleway;"><span style="font-size: 12px; color: rgb(123, 120, 138);">Carrer Aragó, 179 - 4th floor 08011 Barcelona (Spain)</span><span style="font-size: 12px; color: rgb(145, 147, 150);"><br></span></span></span></span></p>
            </div>
            
            <a class="lp-element lp-pom-button" id="lp-pom-button-178" href="/demo/tutorial" target="_self"><span class="label">Start tutorial</span></a><a class="lp-element lp-pom-button" id="lp-pom-button-179" href="#lp-pom-box-979" target="_self"></a>
            <div class="lp-element lp-pom-text nlh" id="lp-pom-text-539">
               <p><span style="font-family: Raleway; font-weight: 400; font-style: normal; color: rgb(123, 120, 138);"><span style="font-size: 12px;">Powered by&nbsp;</span><span style="font-size: 12px;">Validated ID</span></span></p>
            </div>
            <div class="lp-element lp-pom-text nlh" id="lp-pom-text-545">
               <p style="line-height: 20px;"><span style="font-family: Raleway; font-weight: 500; font-style: normal; font-size: 12px; color: rgb(123, 120, 138);">Privacy policy</span><span style="font-family: &quot;PT Serif&quot;; font-weight: 400; font-style: normal; font-size: 12px; color: rgb(145, 147, 150);"><br></span></p>
            </div>
            <div class="lp-element lp-pom-text nlh" id="lp-pom-text-550">
               <p style="line-height: 18px;"><span style="font-family: Raleway; font-weight: 500; font-style: normal; color: rgb(123, 120, 138);"><span style="font-size: 12px;">© Copyright 2020, Validated ID. All Rights Reserved.</span></span></p>
            </div>
            <div class="lp-element lp-pom-box" id="lp-pom-box-641">
               <div id="lp-pom-box-641-color-overlay"></div>
               <div class="lp-element lp-pom-text nlh" id="lp-pom-text-709">
                  <h2 style="line-height: 26px; text-align: center;"><span style="font-style: normal;"><span style="font-weight: 700;"><span style="font-family: Raleway;"><span style="font-size: 20px; color: rgb(234, 232, 241);">Your identity, always protected</span><span style="font-size: 20px; color: rgb(38, 30, 154);"><br></span></span></span></span></h2>
               </div>
               <div class="lp-element lp-pom-text nlh" id="lp-pom-text-710">
                  <p style="line-height: 22px; text-align: center;"><span style="font-style: normal;"><span style="font-weight: 500;"><span style="font-family: Raleway;"><span style="color: rgb(123, 120, 138); font-size: 14px;">Take advantage of secure encryption and blockchain technology to secure your personal identity data. Nobody – not even us – can access the data on your device without your permission. </span></span></span></span></p>
               </div>
               <div class="lp-element lp-pom-text nlh" id="lp-pom-text-716">
                  <p style="text-align: center;"><span style="font-family: Raleway; font-weight: 500; font-style: normal; color: rgb(123, 120, 138);">Collect digital credentials and store them in your ID wallet, or choose which pieces of your data you want to share. You decide. It's that simple.</span></p>
               </div>
               <div class="lp-element lp-pom-text nlh" id="lp-pom-text-717">
                  <h2 style="line-height: 26px; text-align: center;"><span style="font-style: normal;"><span style="font-weight: 700;"><span style="font-family: Raleway;"><span style="font-size: 20px; color: rgb(234, 232, 241);">Control how your own data is shared</span></span></span></span></h2>
               </div>
               <div class="lp-element lp-pom-text nlh" id="lp-pom-text-721">
                  <h2 style="line-height: 26px; text-align: center;"><span style="font-style: normal;"><span style="font-weight: 700;"><span style="font-family: Raleway;"><span style="font-size: 20px; color: rgb(234, 232, 241);">Replace traditional paperwork</span><span style="font-size: 20px; color: rgb(38, 30, 154);"><br></span></span></span></span></h2>
               </div>
               <div class="lp-element lp-pom-text nlh" id="lp-pom-text-722">
                  <p style="line-height: 22px; text-align: center;"><span style="font-family: Raleway; font-weight: 500; font-style: normal; color: rgb(123, 120, 138); font-size: 14px;">Streamline your connections by sharing trusted digital credentials. You can now easily sign in to websites and services and only share the information they really need.</span><span style="font-family: &quot;PT Serif&quot;; font-weight: 400; font-style: normal; color: rgb(93, 107, 143); font-size: 14px;"><br></span></p>
               </div>
               <div class="lp-element lp-pom-image" id="lp-pom-image-793">
                  <div class="lp-pom-image-container" style="overflow: hidden;"><img src="`+spinnerFull+`" alt="" loading="lazy"></div>
               </div>
               <div class="lp-element lp-pom-image" id="lp-pom-image-919">
                  <div class="lp-pom-image-container" style="overflow: hidden;"><img src="`+spinnerHalf+`" alt="" loading="lazy"></div>
               </div>
               <div class="lp-element lp-pom-image" id="lp-pom-image-920">
                  <div class="lp-pom-image-container" style="overflow: hidden;"><img src="`+spinnerQuarter+`" alt="" loading="lazy""></div>
               </div>
               <div class="lp-element lp-pom-box" id="lp-pom-box-1017">
                  <div id="lp-pom-box-1017-color-overlay"></div>
               </div>
            </div>
            <div class="lp-element lp-pom-text nlh" id="lp-pom-text-645">
               <h2 style="line-height: 38px;"><span style="font-style: normal;"><span style="font-weight: 700;"><span style="font-family: Raleway;"><span style="font-size: 32px; color: rgb(234, 232, 241);">A foundation built for scale and forsight</span></span></span></span></h2>
            </div>
            <div class="lp-element lp-pom-text nlh" id="lp-pom-text-646">
               <p style="line-height: 24px;"><span style="font-family: Raleway; font-weight: 500; font-style: normal; color: rgb(123, 120, 138); font-size: 16px;">We're working with national and international partners such as <strong><a href="clkn/https/sovrin.org/" rel="noopener" target="_blank">Sovrin</a></strong>, <strong><a href="clkn/https/identity.foundation/" rel="noopener" target="_blank">DIF</a>,</strong> and <a href="clkn/https/alastria.io/#1" rel="noopener" target="_blank"><strong>Alastria</strong></a> to create an <strong>open ecosystem of decentralized identity&nbsp;</strong>accessible to everyone.</span></p>
            </div>
            <div class="lp-element lp-pom-image" id="lp-pom-image-912">
               <div class="lp-pom-image-container" style="overflow: hidden;"><img src="`+logoVidchain+`" alt="" loading="lazy"></div>
            </div>
            <div class="lp-element lp-pom-image" id="lp-pom-image-939">
               <div class="lp-pom-image-container" style="overflow: hidden;"><img src="`+iphone+`" alt="" loading="lazy"></div>
            </div>
            <div class="lp-element lp-pom-image" id="lp-pom-image-943">
               <div class="lp-pom-image-container" style="overflow: hidden;"><img src="`+logoGooglePlay+`" alt="" loading="lazy"></div>
            </div>
            <div class="lp-element lp-pom-image" id="lp-pom-image-947">
               <div class="lp-pom-image-container" style="overflow: hidden;"><img src="`+logoIOS+`" alt="" loading="lazy"></div>
            </div>
            <div class="lp-element lp-pom-box" id="lp-pom-box-979">
               <div id="lp-pom-box-979-color-overlay"></div>
               <div class="lp-element lp-pom-text nlh" id="lp-pom-text-990">
                  <h2 style="line-height: 43px; text-align: center;"><span style="color: rgb(234, 232, 241);"><span style="font-style: normal;"><span style="font-weight: 700;"><span style="font-family: Raleway;"><span style="font-size: 32px;">Unlock The Potential</span></span></span></span></span></h2>
               </div>
               <a class="lp-element lp-pom-button" id="lp-pom-button-991" href="https://www.youtube.com/embed/eRxVWeX389w" target="_blank" data-params="true"><span class="label"></span></a>
               <div class="lp-element lp-pom-text nlh" id="lp-pom-text-992">
                  <h3 style="text-align: center; line-height: 20px; letter-spacing: 2px;"><span style="font-style: normal;"><span style="font-weight: 800;"><span style="font-family: Raleway;"><strong><span style="font-size: 11px; color: rgb(123, 120, 138);">WATCH VIDEO</span></strong></span></span></span></h3>
               </div>
               <div class="lp-element lp-pom-text nlh" id="lp-pom-text-993">
                  <p style="line-height: 26px; text-align: center;"><span style="color: rgb(123, 120, 138);"><span style="font-family: Raleway; font-weight: 500; font-style: normal;"><span style="font-size: 16px;"><strong>With VIDchain</strong></span></span><span style="font-family: Raleway; font-weight: 500; font-style: normal;"><span style="font-size: 16px;">&nbsp;we're offering secure identity solutions that allow a more digital and sustainable world guaranteeing privacy, rights, and freedom to people.</span></span></span></p>
               </div>
               <div class="lp-element lp-pom-box" id="lp-pom-box-1008">
                  <div id="lp-pom-box-1008-color-overlay"></div>
               </div>
            </div>
            <div class="lp-element lp-pom-image" id="lp-pom-image-995">
               <div class="lp-pom-image-container" style="overflow: hidden;"><img src="`+logoVidchain+`" alt="" loading="lazy"></div>
            </div>
            <div class="lp-element lp-pom-box" id="lp-pom-box-1012">
               <div id="lp-pom-box-1012-color-overlay"></div>
            </div>
            <div class="lp-element lp-pom-box" id="lp-pom-box-1016">
               <div id="lp-pom-box-1016-color-overlay"></div>
            </div>
         </div>
         <div class="lp-element lp-pom-block" id="lp-pom-block-8">
            <div id="lp-pom-block-8-color-overlay"></div>
            <div class="lp-pom-block-content"></div>
         </div>
         <div class="lp-element lp-pom-block" id="lp-pom-block-640">
            <div id="lp-pom-block-640-color-overlay"></div>
            <div class="lp-pom-block-content"></div>
         </div>
         <div class="lp-element lp-pom-block" id="lp-pom-block-951">
            <div id="lp-pom-block-951-color-overlay"></div>
            <div class="lp-pom-block-content"></div>
         </div>
      </div>`;

interface Props {

}

interface State {
  step: number
}

class Main extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      step: +(sessionStorage.getItem("step") || 0)
    };
  }

  componentDidMount() {

  }

  continue(){
    const {step} = this.state;
    sessionStorage.setItem("step", String(step+1))
    this.redirectTo(step);
    this.setState(prevState => {
      return {step: prevState.step + 1}
   })
    
  }
  redirectTo(step: number){
    if(step === 0){
      window.open(config.GOVERNMENT_URL);
    }
    if(step === 1){
      window.open(config.UNIVERSITY_URL);
    }
  }
  render() {
    const {step} = this.state;
  return <div>{ ReactHtmlParser(htmlString) }</div>;
  }
}


export default Main;