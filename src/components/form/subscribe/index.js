import React, { Component } from "react";
import Subscribe from "./form";

export default class LoginIndex extends Component {
  render() {
    return (
      <div>
        <div class="row">
          <h6 className="text-uppercase">Subscribe us</h6>
        </div>
        <div class="row">
          <Subscribe />
        </div>
      </div>
    );
  }
}
