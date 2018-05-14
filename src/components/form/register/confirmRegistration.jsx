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

    axios
      .post("http://localhost:8080/register", {
        firstName,
        surName,
        userName,
        email,
        password,
        confirmPassword
      })
      .then(result => {
        console.log(result);
        this.props.history.replace("/registration-done");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const state = this.props.userData;
    return (
      <div className="lesson-form">
        <h3>
          Hello  {state.firstName} , please check your details and complete your
          registration
        </h3>
        <ul>
          <li>First name: {state.firstName}</li>
          <li>Last name: {state.surName}</li>
          <li>User name: {state.userName}</li>
          <li>Email: {state.email}</li>
        </ul>
        <div className="row container">
          <Button
            className="btn btn-outline-dark"
            value="Back"
            onClick={this.props.onConfirmSubmit}
          />
          &nbsp; &nbsp;
          <Button
            className="btn btn-outline-dark"
            value="Looks fine"
            onClick={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

export default ConfirmRegistration;
