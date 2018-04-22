import React, { Component } from "react";

import Logo from "../components/header/Logo";
import Navbar from "../components/header/Navbar";
import UserInfo from "../components/header/userInfo";


class Header extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <Logo />
          <Navbar />
        </div>
        <div>
          <UserInfo {...this.props} />
        </div>
      </div>
    );
  }
}

export default Header;
