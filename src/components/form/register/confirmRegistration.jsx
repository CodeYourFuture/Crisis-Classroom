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
        <h2>Username : <small>{state.userName}</small></h2>
        <h2>First Name : <small>{state.firstName}</small></h2>
        <h2>Surname : <small>{state.surName}</small></h2>
        <h2>Email :<small>{state.email}</small></h2>
        <Button
          className="btn btn-outline-dark"
          value="register"
          onClick={this.onSubmit}
        />
      </div>
    );
  }
}

export default ConfirmRegistration;
