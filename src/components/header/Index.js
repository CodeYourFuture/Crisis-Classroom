import React, { Component } from "react";

import Logo from "./Logo";
import NavbarFeatures from "./Navbar";
import Search from "./Search";
import SocialMedia from "./SocialMedia";
import User from "./User";
import "../../App.css";

class Header extends Component {
  render() {
    return (
      <div>
        <div className="row header-1">
          <Logo />
          <NavbarFeatures />
          <Search />
        </div>
        <div className="row header-1">
          <SocialMedia />
          <div />
          <User />
        </div>
      </div>
    );
  }
}

export default Header;
