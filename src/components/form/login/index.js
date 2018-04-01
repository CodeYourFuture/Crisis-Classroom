import React, { Component } from "react";
import LoginForm from "./form";

export default class LoginIndex extends Component {
  render() {
    return (
      <div>
        <h1>Log In</h1>
        <LoginForm />
      </div>
    );
  }
}
