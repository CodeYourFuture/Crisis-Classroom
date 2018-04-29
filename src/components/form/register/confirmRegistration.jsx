import React, { Component } from "react";
import Button from "../../button";
import axios from "axios";

class ConfirmRegistration extends Component {
  
  onSubmit = () => {
    const {
      firstName,
      surName,
      userName,
      email,
      password,
      confirmPassword
    } = this.props.userData;

    axios.post("http://localhost:8080/register", {
        firstName,
        surName,
        userName,
        email,
        password,
        confirmPassword
      })
      .then(result => {
        console.log(result);
        this.props.history.replace("/");
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const state = this.props.userData;
    return (
      <div className="lesson-form">
        <h1>{state.userName}</h1>
        <h1>{state.firstName}</h1>
        <h1>{state.surName}</h1>
        <h1>{state.email}</h1>
        <Button
          className="btn btn-outline-dark"
          value="Register"
          onClick={this.onSubmit}
        />
      </div>
    );
  }
}

export default ConfirmRegistration;
