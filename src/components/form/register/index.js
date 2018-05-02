import React, { Component } from "react";
import Form from "./form";
import ConfirmRegistration from "./confirmRegistration";
import "./style.css";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      surName: "",
      userName: "",
      email: "",
      password: "",
      formSubmitted: false,
      errors: []
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onFormSubmit = () => {
    this.setState({
      formSubmitted: true
    });
  };
  onConfirmSubmit = () => {
    console.log("hi im here");
    this.setState({
      formSubmitted: false
    });
  };

  render() {
    return (
      <div className="registration">
        <h3>Registration</h3>
        {!this.state.formSubmitted ? (
          <Form
            onFormSubmit={this.onFormSubmit}
            handleChange={this.handleChange}
            userData={this.state}
            history={this.props.history}
          />
        ) : (
          <ConfirmRegistration
            onConfirmSubmit={this.onConfirmSubmit}
            userData={this.state}
            onSubmit={this.onSubmit}
            history={this.props.history}
          />
        )}
      </div>
    );
  }
}

export default Registration;
