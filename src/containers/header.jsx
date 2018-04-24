import React, { Component } from "react";

import Logo from "../components/header/Logo";
import Navbar from "../components/header/Navbar";


class Header extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <Logo />
          <Navbar {...this.props} />
        </div>
      </div>
    );
  }
}

export default Header;
