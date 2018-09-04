import React, { Component } from "react";

import Navbar from "../components/header/Navbar";

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar {...this.props} />
      </div>
    );
  }
}

export default Header;
