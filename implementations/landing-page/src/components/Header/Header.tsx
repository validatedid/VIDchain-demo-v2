import React, { Component } from "react";
import "./Header.css";

import logoVidchain from "../../assets/images/3531224b-vidchain.svg";

interface Props {
  tutorial: boolean;
}

function Header (props: Props) {
    const {tutorial} = props;
    return (
      <header className="headerBackground">
        <img
          className="logoHeader"
          src={logoVidchain}
          alt="Logo"
        />
        {tutorial && 
          <p className="powered">Powered by Validated ID</p>
        }
        {!tutorial && 
          <a href="/demo/tutorial" className="tutorial">Start tutorial</a>
        }
      </header>
    );
}

export default Header;
