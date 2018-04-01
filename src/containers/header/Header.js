import React, { Component } from "react";

import Logo from "../../components/header/Logo";
import NavbarFeatures from "../../components/header/Navbar";
import Search from "../../components/header/Search";
import SocialMedia from "../../components/header/SocialMedia";
import User from "../../components/header/User";
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
          <div></div>
          <User />
        </div>
      </div>
    );
  }
}

export default Header;
