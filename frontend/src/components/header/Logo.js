import React, { Component } from "react";
import CrisisLogo from "../../image/icons/crisis-logo.svg"

class Logo extends Component {
  render() {
    return (
      <div className="App-logo">
      <div
        className="col-xs-12 col-sm-2">
        <img
          alt="Logo crisis classroom"
          height="60"
          src={CrisisLogo}
        />
        </div>
      </div>
    );
  }
}

export default Logo;
