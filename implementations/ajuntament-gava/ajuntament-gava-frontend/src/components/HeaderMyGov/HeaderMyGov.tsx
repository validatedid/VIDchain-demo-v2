import React, { Component } from "react";
import "./HeaderMyGov.css";

class HeaderMyGov extends Component {
  render() {
    return (
      <header>
          <div className="spaceHeader"></div>
          <div className="subHeader">
            <img src={require("../../assets/images/ciutada.png")} className="imageMyGov" />
            <div className="textMyGov">
                <h1>La meva carpeta ciutadana</h1>
                <h3>Controla des d'un sol lloc les teves gestions amb totes les Administracions</h3>
            </div>  
          </div>
      </header>
    );
  }
}

export default HeaderMyGov;
