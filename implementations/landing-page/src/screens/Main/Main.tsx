import './Main.css';
import Header from '../../components/Header/Header';
import ReactHtmlParser from 'react-html-parser';

import iphone from "../../assets/images/f11a0677-iphone-walet_10000000ex0tt000004028.png";
import spinnerFull from "../../assets/images/fe38d7b7-recurso-4.svg";
import spinnerHalf from "../../assets/images/3a24678c-recurso-2.svg";
import spinnerQuarter from "../../assets/images/e9f173fc-recurso-3.svg";
import logoVidchain from "../../assets/images/3531224b-vidchain.svg";
import logoGooglePlay from "../../assets/images/a6acde6a-google-play.svg";
import logoIOS from "../../assets/images/b6b7988d-app-store.svg";


export default function Main () {
   return (
      <div className="bodyLanding">
         <Header tutorial={false}/>
      </div>
   );
}