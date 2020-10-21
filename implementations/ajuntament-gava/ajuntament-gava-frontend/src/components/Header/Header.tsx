import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <header>
		
      <div id="cabeceraPri"> 
      
      <div id="HEADER_PTS" className="HEADER widget ">
        
        <div id="aazone.HEADER_PTS"><div id="logo">
  <a href="../../sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_HOME"><img src={require("../../assets/images/cabe.jpg")} alt="Seu electrònica del Ajuntament" /></a></div>
  <div id="textosHeader">
      <h1>
      <a href="https://eseu.gava.cat/sta/CarpetaPublic/doEvent?APP_CODE=STA&amp;PAGE_CODE=PTS_HOME">
          &nbsp;</a>
        </h1>	
      <h2>&nbsp;</h2>
      </div>
    </div></div></div>
       
        <div className="clear"></div>
        
      
    
      </header>
    );
  }
}

export default Header;
