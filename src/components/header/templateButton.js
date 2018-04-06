import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class TemplateButton extends Component {
  render() {
    return (
      <div className="App-logo">
        <Link to="/templates">
          <button className="btn btn-primary">Templates</button>
        </Link>
      </div>
    );
  }
}
