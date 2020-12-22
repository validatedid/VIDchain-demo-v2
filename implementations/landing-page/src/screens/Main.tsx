import React, { Component } from 'react';
import './Main.css';
import * as config from "../config/config";
import ReactHtmlParser from 'react-html-parser';
import iphone from "../assets/images/f11a0677-iphone-walet_10000000ex0tt000004028.png";
import spinnerFull from "../assets/images/fe38d7b7-recurso-4.svg";
import spinnerHalf from "../assets/images/3a24678c-recurso-2.svg";
import spinnerQuarter from "../assets/images/e9f173fc-recurso-3.svg";
import logoVidchain from "../assets/images/3531224b-vidchain.svg";
import logoGooglePlay from "../assets/images/a6acde6a-google-play.svg";
import logoIOS from "../assets/images/b6b7988d-app-store.svg";
import freedonia from "../assets/images/e076bd14-freedonia.svg";
import university from "../assets/images/ed205e7d-acme.svg";


const htmlString = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
   <head>
      <META http-equiv="Content-Type" content="text/html; charset=UTF-8" >
      <!--09542cfc-a0b7-4675-9fac-543f8bede0e4 a-->
      <title></title>
      <meta name="keywords" content="">
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="lp-version" content="v6.23.8">
      <style title="page-styles" type="text/css" data-page-type="main_desktop"></style>
      <style title="page-styles" type="text/css" data-page-type="main_mobile"></style>
      <!-- lp:insertions start head -->
      <link href="//builder-assets.unbounce.com/published-css/main-7b78720.z.css" rel="stylesheet" media="screen" type="text/css" />
      <meta property='og:title' content='http://unbouncepages.com/vidchain-demo/'/>
      <script type="text/javascript">window.ub = {"page":{"id":"09542cfc-a0b7-4675-9fac-543f8bede0e4","variantId":"a","usedAs":"main","name":"VIDchain demo","url":"http://unbouncepages.com/vidchain-demo/","dimensions":{"desktop":{"height":3734,"width":940},"mobile":{"height":4761,"width":320},"mobileMaxWidth":600}},"hooks":{"beforeFormSubmit":[],"afterFormSubmit":[]}};</script><script>window.ub.page.lightboxTriggers = [{"selector":"#lp-pom-button-991","sizes":{"desktop":{"height":360,"width":640},"mobile":{"width":320,"height":360}},"isExternal":false}];</script><script>window.ub.page.webFonts = ['Raleway:700,500,600,regular,800,900','Montserrat:600,500','PT Serif:regular'];</script><!-- lp:insertions end head -->
      <script type="text/javascript">window.ub=window.ub||{};window.ub.domain={"wordpressEnabled":true};</script>
      <script async src="https://d34qb8suadcc4g.cloudfront.net/ub.js?1605293159" type="text/javascript"></script>
   </head>
   <body class="lp-pom-body">
      <!-- lp:insertions start body:before --><!-- lp:insertions end body:before -->
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
            <a class="lp-element lp-pom-button" id="lp-pom-button-178" href="#lp-pom-block-648" target="_self"><span class="label">Start tutorial</span></a><a class="lp-element lp-pom-button" id="lp-pom-button-179" href="#lp-pom-block-376" target="_self"><span class="label">About</span></a>
            <div class="lp-element lp-pom-text nlh" id="lp-pom-text-378">
               <h2 style="line-height: 38px; text-align: center;"><span style="font-size: 32px;"><span style="font-family: Raleway; font-weight: 600; font-style: normal;"><span style="color: rgb(234, 232, 241);">Join the change, let's start getting your first digital credentials!</span></span></span><span style="font-size: 36px;"><span style="font-family: Montserrat; font-weight: 500; font-style: normal;"><span style="color: rgb(38, 30, 154);"><br></span></span></span></h2>
            </div>
            <div class="lp-element lp-pom-text nlh" id="lp-pom-text-379">
               <p style="line-height: 26px; text-align: center;"><span style="font-family: Raleway; font-weight: 500; font-style: normal; color: rgb(123, 120, 138); font-size: 16px;">This is a tutorial designed to get you familiar with digital credentials. To start with it, make sure<span style="font-size: 16px;">&nbsp;you've downloaded the VIDchain app on your phone and complete the setting of your profile. Once you've done this, you're all set for collecting all kinds of useful things.</span></span><span style="font-family: &quot;PT Serif&quot;; font-weight: 400; font-style: normal; color: rgb(93, 107, 143); font-size: 16px;"><br></span></p>
            </div>
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
            <div class="lp-element lp-pom-box" id="lp-pom-box-897">
               <div id="lp-pom-box-897-color-overlay"></div>
               <div class="lp-element lp-pom-text nlh" id="lp-pom-text-402">
                  <h2 style="line-height: 24px;"><span style="color: rgb(123, 120, 138);"><span style="font-style: normal;"><span style="font-weight: 700;"><span style="font-family: Raleway;"><span style="font-size: 20px;">Get your first citizenship credential</span></span></span></span></span><span style="color: rgb(247, 247, 247);"><span style="font-style: normal;"><span style="font-weight: 700;"><span style="font-family: Raleway;"><span style="font-size: 20px;"><br></span></span></span></span></span></h2>
               </div>
               <div class="lp-element lp-pom-text nlh" id="lp-pom-text-403">
                  <h3><span style="color: rgb(123, 120, 138);"><span style="font-style: normal;"><span style="font-weight: 500;"><span style="font-family: Raleway;"><span style="font-size: 14px;">The Freedonia government is about to recognize you as one of their citizens. Access to their website and login with your VIDchain wallet to prove your identity.&nbsp;</span></span></span></span></span></h3>
                  <h3><span style="color: rgb(123, 120, 138);"><span style="font-style: normal;"><span style="font-weight: 500;"><span style="font-family: Raleway;"><span style="font-size: 14px;">Once you get your citizenship credential you'd be able to request more social proofs about you, for example, requesting a large family credential that you can use with other entities to get discounts. Trust us, you may need it later!</span></span></span></span></span><span style="color: rgb(247, 247, 247);"><span style="font-style: normal;"><span style="font-weight: 500;"><span style="font-family: Raleway;"><span style="font-size: 14px;"><strong><br></strong></span></span></span></span></span></h3>
               </div>
               <a class="lp-element lp-pom-button" id="lp-pom-button-899" href="clkn/http/unbouncepages.com/citizen-of-freedonia/" target="_blank" data-params="true"><span class="label">Go to freedonia's government website</span></a>
               <div class="lp-element lp-pom-image" id="lp-pom-image-900">
                  <div class="lp-pom-image-container" style="overflow: hidden;"><img src="`+freedonia+`" alt="" loading="lazy"></div>
               </div>
            </div>
            <div class="lp-element lp-pom-box" id="lp-pom-box-902">
               <div id="lp-pom-box-902-color-overlay"></div>
               <div class="lp-element lp-pom-text nlh" id="lp-pom-text-903">
                  <h3><span style="color: rgb(123, 120, 138);"><span style="font-style: normal;"><span style="font-weight: 500;"><span style="font-family: Raleway;"><span style="font-size: 14px;">You can now request your first diploma degree at Acme University and prove your hard work studying. First, access to their website and login with your VIDchain wallet to prove your identity.&nbsp;</span></span></span></span></span></h3>
                  <h3><span style="color: rgb(123, 120, 138);"><span style="font-style: normal;"><span style="font-weight: 500;"><span style="font-family: Raleway;"><span style="font-size: 14px;">Once you get your student credential, play around, and get your first discount by using the large family credential that you stored from the Freedonia's government.</span></span></span></span></span><span style="color: rgb(247, 247, 247);"><span style="font-style: normal;"><span style="font-weight: 500;"><span style="font-family: Raleway;"><span style="font-size: 14px;"><strong><br></strong></span></span></span></span></span></h3>
               </div>
               <a class="lp-element lp-pom-button" id="lp-pom-button-905" href="clkn/http/unbouncepages.com/welcometoacmeuniversity/" target="_blank"><span class="label">Go to acme's university website</span></a>
               <div class="lp-element lp-pom-text nlh" id="lp-pom-text-906">
                  <h2 style="line-height: 24px;"><span style="color: rgb(123, 120, 138);"><span style="font-style: normal;"><span style="font-weight: 700;"><span style="font-family: Raleway;"><span style="font-size: 20px;">Get your first student credential</span></span></span></span></span><span style="color: rgb(247, 247, 247);"><span style="font-style: normal;"><span style="font-weight: 700;"><span style="font-family: Raleway;"><span style="font-size: 20px;"><br></span></span></span></span></span></h2>
               </div>
               <div class="lp-element lp-pom-image" id="lp-pom-image-967">
                  <div class="lp-pom-image-container" style="overflow: hidden;"><img src="`+university+`" alt="" loading="lazy"></div>
               </div>
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
            <div class="lp-element lp-pom-box" id="lp-pom-box-956">
               <div id="lp-pom-box-956-color-overlay"></div>
            </div>
            <div class="lp-element lp-pom-box" id="lp-pom-box-979">
               <div id="lp-pom-box-979-color-overlay"></div>
               <div class="lp-element lp-pom-text nlh" id="lp-pom-text-990">
                  <h2 style="line-height: 43px; text-align: center;"><span style="color: rgb(234, 232, 241);"><span style="font-style: normal;"><span style="font-weight: 700;"><span style="font-family: Raleway;"><span style="font-size: 32px;">Unlock The Potential</span></span></span></span></span></h2>
               </div>
               <a class="lp-element lp-pom-button" id="lp-pom-button-991" href="clkn/rel/a-2-lightbox.html" target="_blank" data-params="true"><span class="label"></span></a>
               <div class="lp-element lp-pom-text nlh" id="lp-pom-text-992">
                  <h3 style="text-align: center; line-height: 20px; letter-spacing: 2px;"><span style="font-style: normal;"><span style="font-weight: 800;"><span style="font-family: Raleway;"><strong><span style="font-size: 11px; color: rgb(123, 120, 138);">WATCH VIDEO</span></strong></span></span></span></h3>
               </div>
               <div class="lp-element lp-pom-text nlh" id="lp-pom-text-993">
                  <p style="line-height: 26px; text-align: center;"><span style="color: rgb(123, 120, 138);"><span style="font-family: Raleway; font-weight: 500; font-style: normal;"><span style="font-size: 16px;"><strong>With VIDchain</strong></span></span><span style="font-family: Raleway; font-weight: 500; font-style: normal;"><span style="font-size: 16px;">&nbsp;we're offering secure identity solutions that allow a more digital and sustainable world guaranteeing privacy, rights, and freedoms to people.</span></span></span></p>
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
            <div class="lp-element lp-pom-box" id="lp-pom-box-1014">
               <div id="lp-pom-box-1014-color-overlay"></div>
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
         <div class="lp-element lp-pom-block" id="lp-pom-block-648">
            <div id="lp-pom-block-648-color-overlay"></div>
            <div class="lp-pom-block-content"></div>
         </div>
         <div class="lp-element lp-pom-block" id="lp-pom-block-376">
            <div id="lp-pom-block-376-color-overlay"></div>
            <div class="lp-pom-block-content"></div>
         </div>
         <div class="lp-element lp-pom-block" id="lp-pom-block-82">
            <div id="lp-pom-block-82-color-overlay"></div>
            <div class="lp-pom-block-content"></div>
         </div>
      </div>
      <!-- lp:insertions start body:after --><script async src="//builder-assets.unbounce.com/published-js/main.bundle-5c6e41c.z.js" type="text/javascript"></script><script type="text/javascript">Array.prototype.slice
         .call(document.querySelectorAll('.lp-pom-form form input[name^=ubafs-]'))
         .forEach(function(input) {
           input.parentNode.removeChild(input);
         });
         
         Array.prototype.slice.call(document.querySelectorAll('.lp-pom-form form')).forEach(function(form) {
         var jevField = document.createElement('input');
         jevField.type = 'hidden';
         jevField.name = 'ubafs-jev';
         jevField.id = jevField.name;
         jevField.value = JSON.stringify({
           date: new Date(),
           agent: navigator.userAgent,
           screen: {
             availWidth: screen.availWidth,
             availHeight: screen.availHeight,
             width: screen.width,
             height: screen.height,
           },
           window: {
             innerWidth: window.innerWidth,
             innerHeight: window.innerHeight,
           },
           hasPlugins: 'length' in navigator.plugins && navigator.plugins.length > 0,
         });
         
         form.appendChild(jevField);
         });
      </script>
      <!-- lp:insertions end body:after -->
   </body>
</html>`;

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
