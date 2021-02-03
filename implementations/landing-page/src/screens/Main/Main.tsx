import './Main.css';
import {Grid, Typography, Container} from '@material-ui/core';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ReactHtmlParser from 'react-html-parser';

import {StartButton} from '../../components/StartButton/StartButton';
import iphone from "../../assets/images/f11a0677-iphone-walet_10000000ex0tt000004028.png";
// import spinnerFull from "../../assets/images/fe38d7b7-recurso-4.svg";
// import spinnerHalf from "../../assets/images/3a24678c-recurso-2.svg";
// import spinnerQuarter from "../../assets/images/e9f173fc-recurso-3.svg";
import logoVidchain from "../../assets/images/3531224b-vidchain.svg";
import logoGooglePlay from "../../assets/images/android.png";
import logoIOS from "../../assets/images/ios.png";
// import foundation from '../../assets/images/86da6627-recurso-13.svg';
import video from '../../assets/images/video.png';
// import startTutorial from '../../assets/images/tutorial.svg';

import foundation from '../../assets/images/animations/animation_intro.gif';
import startTutorial from '../../assets/images/animations/animation3.gif';
import spinnerFull from "../../assets/images/animations/itemB.gif";
import spinnerHalf from "../../assets/images/animations/itemC.gif";
import spinnerQuarter from "../../assets/images/animations/itemA.gif";


export default function Main () {
   return (
      <Grid container 
            direction="row"
            className="bodyLanding">
         <Header />
         
         <Grid container 
            direction="row"
            justify="flex-start"
            alignItems="center"
            className="contentLanding">
            <Grid item lg={1} sm={1}></Grid>
            <Grid item lg={4} sm={5} xs={12} className="titleLanding">
             <Typography variant="h4">
                <b>
                {"Your ID wallet, \nsimple and secure"}
                </b>
               </Typography>
               <Typography variant="subtitle1">
                  {
                  "VIDchain is a service designed for helping you to regain"+
                  " control over your digital identity and to exchange digital"+
                  " credentials in a secure and private way. Your info alway with you!"
                  }
               </Typography>
               <Typography variant="subtitle1">
                  {
                  "Come on, get familiar with it. But first, make sure you"+
                  " have downloaded the VIDchain app on your phone."
                  }
               </Typography>
               <div className="logoStores">
                  <a className="logoStoreGoogle" href="https://play.google.com/store/apps/details?id=com.validatedid.wallet"><img src={logoGooglePlay}></img></a>
                  <a><img className="logoStoreiOS" src={logoIOS}></img></a>
               </div>
           </Grid>
           <Grid item sm={1} lg={2}></Grid>
           <Grid item sm={1} xs={12} lg={5}>
               <img className="iphone" src={iphone} />
           </Grid>
           
        </Grid>
        
        
        <Grid container 
            direction="row"
            justify="center"
            alignItems="center"
            className="contentLandingItems">
            
            <hr className="divider" />
            
            <Grid item xs={12} sm={4} lg={4}>
            <div className="item">
               <img className="itemLogo" src={spinnerQuarter} />
               <Typography variant="h6">
                  {"Your identity, always protected"}
               </Typography>
               <Typography variant="subtitle2" className="bodyText">
                  {"Take advantage of secure encryption and blockchain technology to secure your personal identity data. Nobody not even us - can access the data on your device without your permission."}
               </Typography>
               </div>
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
               <div className="item">
                  <img className="itemLogo" src={spinnerFull} />
                  <Typography variant="h6">
                     {"Control how your own data is shared"}
                  </Typography>
                  <Typography variant="subtitle2" className="bodyText">
                     {"Collect digital credentials and store them in your ID wallet, or choose which pieces of your data you want to share. You decide. It's simple."}
                  </Typography>
               </div>
            </Grid>
            <Grid item xs={12} sm={4}  lg={4}>
               <div className="item">
                  <img className="itemLogo" src={spinnerHalf} />
                  <Typography variant="h6">
                     {"Replace traditional paperwork"}
                  </Typography>
                  <Typography variant="subtitle2" className="bodyText">
                     {"Streamline your connnections by sharing trusted digital credentials. You can now easily sign in to websites and services and only share the information they really need."}
                  </Typography>
               </div>
            </Grid>
         </Grid>

         <Grid container 
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            className="contentLandingFoundation">
            
            <hr className="divider" />
            <Grid item lg={1} sm={1}></Grid>
            <Grid item lg={4} sm={5} xs={12} className="titleLanding">
             <Typography variant="h4">
                <b>
                {"A foundation built for scale and forsight"}
                </b>
               </Typography>
               <Typography variant="subtitle1" className="bodyText">
                  {
                  "We're working with national and international partners"+
                  " such as Sovrin, DIF, and Alastria to create an open ecosystem"+
                  " of decentralized identity accessible to everyone."
                  }
               </Typography>
           </Grid>
           <Grid item sm={1} lg={1}></Grid>
           <Grid item sm={5} xs={12} lg={6}>
               <img className="imageFoundation" src={foundation} />
            </Grid>
         </Grid>


         <Grid container 
            direction="row"
            justify="center"
            alignItems="center"
            className="contentLandingVideo">
            
            <hr className="divider" />           
            <Grid item sm={12} xs={12} lg={4} className="titleLandingVideo">
                  <Typography variant="h4">
                  <b>
                  {"Unlock the potential"}
                  </b>
                  </Typography>
            </Grid>
            <Grid item sm={12} xs={12} lg={2}>
                  <a className="labelVideo" href="https://www.youtube.com/embed/eRxVWeX389w" target="_blank" data-params="true">
                     <img className="video" src={video} />
                     <p>WATCH VIDEO</p>
                     <br />
                  </a>
            </Grid>
            <Grid item sm={12} xs={12} lg={6} className="bodyText">
                  <Typography variant="subtitle1">
                  {
                  "With VIDchain we're offering secure identity solutions that allow a more digital"+
                  " and sustainable world guaranteeing privacy, rights, and freedoms to people."
                  }
               </Typography>
            </Grid>
         </Grid>

         <Grid container 
            direction="row"
            justify="space-between"
            alignItems="center"
            className="contentLandingTutorial">
            
            <hr className="divider" />
            <Grid item sm={1} lg={1}></Grid>
            <Grid item sm={4} lg={4} xs={12}>
               <img className="imageStartTutorial" src={startTutorial} />
            </Grid>
            <Grid item sm={5} lg={5} xs={12}className="titleLanding">
             <Typography variant="h4">
                <b>
                {"Welcome to the VIDchain tutorial"}
                </b>
               </Typography>
               <Typography variant="subtitle1" className="bodyText">
                  {
                  "Try the new VIDchain demo. Enjoy fast and secure access to a"+
                  " variety of possible organizations. Issue and verify SSI credentials"+
                  " that you can store in your ID wallet."
                  }
               </Typography>
               <StartButton variant="contained" onClick={()=> window.open("/demo/tutorial")}>
                  {"Yes! Let's start"}
                </StartButton>
           </Grid>
           <Grid item sm={2} lg={2} xs={12}></Grid>
           
           
         </Grid>

         <Footer />

      </Grid>
   );
}