import React, { Component } from "react";
import Input from "../../input";
import Label from "../../label";
import axios from "axios";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = () => {
    const { password, confirmPassword } = this.state;
    const {
        resetPasswordToken
      } = this.props.location.state.data;
    axios
      .post("http://localhost:8080/reset-password", {
        password,
        confirmPassword,
        resetPasswordToken
      })
      .then(result => {
        if (result) {
          console.log(result);
          this.props.history.replace("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    // const {
    //   userName
    // } = this.props.location.state.data;
    return (
      <div>
        <div>
          <h3>Enter new password</h3>
          <div className="login-form">
            <p>
              Hi {userName} please enter Your new password and click submit to
              reset your password.
            </p>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <Label value="Password *" />
                <Input
                  className="form-control"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <Label value="Confirm Your Password *" />
                <Input
                  className="form-control"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Your Password"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                />
              </div>
              <button
                className="btn btn-outline-dark"
                value="Sabmit"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
