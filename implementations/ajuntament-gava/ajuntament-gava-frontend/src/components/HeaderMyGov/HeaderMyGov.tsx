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
                <div style={{float: "left", marginLeft: "5%", marginTop: "2%"}}>
                    <ul style={{listStyleType: "none"}}>
                        <li>
                            <img src={require("../../assets/images/check.svg")} />Visió integrada amb totes les Administracions públiques
                        </li>
                        <li>
                            <img src={require("../../assets/images/check.svg")} />T'avisem quan detectem nova activitat
                        </li>

                    </ul>
                </div>
                <div style={{float: "right", marginRight: "10%",  marginTop: "2%"}}>
                <ul style={{listStyleType: "none"}}>
                        <li>
                            <img src={require("../../assets/images/check.svg")} />Agafa el control. Assabenta't de què passa amb les teves dades
                        </li>
                    </ul>
                </div>
            </div>  
          </div>
      </header>
    );
  }
}

export default HeaderMyGov;
