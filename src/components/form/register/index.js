import React, { Component } from "react";
// import { Switch, Route } from "react-router-dom";
import Form from "./form";
import ConfirmRegistration from "./confirmRegistration";
import "./style.css"

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
        // <Switch>
        //   <Route exact path="/register" Component={Form} />
        //   <Route path="/confirm-registration" Component={ConfirmRegistration} />
        // </Switch>

      <div className="registration">
        <h3>Registration</h3>
        <Form handleChange={this.handleChange} state={this.state} history={this.props.history} />
        <ConfirmRegistration state={this.state} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default Registration;
