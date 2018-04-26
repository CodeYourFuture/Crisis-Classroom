import React, { Component } from "react";
// import { Switch, Route } from "react-router-dom";
import Form from "./form";
import ConfirmRegistration from "./confirmRegistration";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      surName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      passwordMach: null,
      errors: []
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      //   <Switch>
      //     <Route path="/register" Component={Form} />
      //     <Route path="/confirm-registration" Component={ConfirmRegistration} />
      //   </Switch>

      <div>
        <Form handleChange={this.handleChange} state={this.state} />
        <ConfirmRegistration state={this.state} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default Registration;
