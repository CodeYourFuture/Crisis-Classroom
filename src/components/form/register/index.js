import React, { Component } from "react";
import Form from "./form";
import ConfirmRegistration from "./confirmRegistration";
import axios from "axios";

import "./style.css";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      surName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword:'',
      formSubmitted: false,
      errors: [],
      checkUserName: [],
      checkEmail: []
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

    const { userName } = this.state;
    axios
      .post("http://localhost:8080/check-user-name", {
        userName
      })
      .then(res => {
        this.setState({ checkUserName: res.data.rows[0].userName });
      })
      .catch(error => {
        this.setState({
          error
        });
      });

    const { email } = this.state;
    axios
      .post("http://localhost:8080/check-email", {
        email
      })
      .then(res => {
        this.setState({ checkEmail: res.data.rows[0].email });
      })
      .catch(error => {
        this.setState({
          error
        });
      });
  };

  onFormSubmit = () => {
    this.setState({
      formSubmitted: true
    });
  };
  onConfirmSubmit = () => {
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
