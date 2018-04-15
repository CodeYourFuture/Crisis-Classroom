import React, { Component } from "react";

import Logo from "./Logo";
import NavbarFeatures from "./Navbar";
import UserInfo from "./userInfo";
import "./Style.css";

class Header extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <Logo />
          <NavbarFeatures />
        </div>
        <div>
          <UserInfo {...this.props} />
        </div>
      </div>
    );
  }
}

export default Header;
