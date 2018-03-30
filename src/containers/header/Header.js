import React, { Component } from "react";

import Logo from "../../components/header/Logo";
import NavbarFeatures from "../../components/header/Navbar";
import Search from "../../components/header/Search";
import SocialMedia from "../../components/header/SocialMedia";

class Header extends Component {
  render() {
    return (
      <div className="row">
        <Logo />
        <NavbarFeatures />
        <Search />
        <SocialMedia />
      </div>
    );
  }
}

export default Header;
