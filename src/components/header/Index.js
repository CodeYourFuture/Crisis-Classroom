import React, { Component } from "react";

import Logo from "./Logo";
import NavbarFeatures from "./Navbar";
// import User from "./User";
import "../../App.css";

class Header extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <Logo />
          <NavbarFeatures />
        </div>
      </div>
    );
  }
}

export default Header;
