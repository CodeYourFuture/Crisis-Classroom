import React, { Component } from "react";
import './Style.css';

class Logo extends Component {
  render() {
    return (
      <div className="App-logo">
      <a href="/" className="col-xs-12 col-sm-2">
        <img
          alt="Logo crisis classroom"
          height="60"
          src="https://www.crisisclassroom.com/img/crisis-logo.svg"
        />
        </a>
      </div>
    );
  }
}

export default Logo;
