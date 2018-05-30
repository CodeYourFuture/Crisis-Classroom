import React, { Component } from "react";
import Input from "../../input";
import Label from "../../label";
import Button from "../../button";
import { Link } from "react-router-dom";
import axios from "axios";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      data: false,
      errors: {
        password: null,
        confirmPassword: null
      }
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onFormSubmit = () => {
    const { password, confirmPassword } = this.state;
    const { resetPasswordToken } = this.props.location.state.data;
    axios
      .post("http://localhost:8080/reset-password", {
        password,
        confirmPassword,
        resetPasswordToken
      })
      .then(result => {
        if (result.data.response) {
          this.setState({
            data: "Something went wrong."
          });
        } else if (result.data) {
          const data = result.data;
          this.setState({ data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    if (errors) {
      this.setState({ errors });
    }
  };

  validate() {
    const { password, confirmPassword } = this.state;

    const errors = {
      password: null,
      confirmPassword: null
    };
    if (password.length === 0) {
      errors.password = `Password field is required .`;
    } else if (password.length < 6) {
      errors.password = `Password should be at least 6 characters long .`;
    } else if (confirmPassword.length === 0) {
      errors.confirmPassword = `Confirm password field is required .`;
    } else if (confirmPassword.length < 6) {
      errors.confirmPassword = `Password should be at least 6 characters long .`;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = `Passwords do not mach .`;
    } else {
      this.onFormSubmit();
    }
    return errors;
  }
  render() {
    const data = this.state.data;
    const { errors } = this.state;
    return (
      <div>
        <h3>Reset password</h3>
        <div className="login-form">
          {data ? (
            <div>
              <p>{data}</p>
              <Link to="/login">Go to login page</Link>
            </div>
          ) : (
            <div>
              <p>
                Hi there please enter Your new password and click submit to
                reset your password.
              </p>
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
                {errors.password !== null && (
                  <span className="error">{errors.password}</span>
                )}
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
                {errors.confirmPassword !== null && (
                  <span className="error">{errors.confirmPassword}</span>
                )}
              </div>
              <Button
                className="btn btn-outline-dark"
                value="Submit"
                onClick={this.onSubmit}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ResetPassword;
