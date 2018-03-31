import React, { Component } from "react";

import Logo from "../../components/header/Logo";
import NavbarFeatures from "../../components/header/Navbar";
import Search from "../../components/header/Search";
import SocialMedia from "../../components/header/SocialMedia";
import '../../App.css';

class Header extends Component {
  render() {
    return (
      <div className="row header-1">
        <Logo />
        <NavbarFeatures />
        
        <Search />
        <SocialMedia />
        
      </div>
    );
  }
}

export default Header;
