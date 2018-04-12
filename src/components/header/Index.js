import React, { Component } from "react";

import Logo from "./Logo";
import NavbarFeatures from "./Navbar";
import UserInfo from "./userInfo";
import "../../App.css";

class Header extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <Logo />
          <NavbarFeatures />
        </div>
       < UserInfo/>
      </div>
    );
  }
}

export default Header;
