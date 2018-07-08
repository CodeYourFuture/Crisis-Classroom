import React, { Component } from "react";
import Input from "../../input";
import Label from "../../label";
import Button from "../../button";
import { Link } from "react-router-dom";
import axios from "axios";

const PAGESTATUS = { none: 0, err: 1, success: 2 };

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      msg: null,
      pageStatus: PAGESTATUS.none,
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
    const { token } = this.props.location.state.data;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/reset-password`, {
        password,
        confirmPassword,
        token
      })
      .then(result => {
        const msg = result.data;
        if (msg) {
          this.setState({ msg, pageStatus: PAGESTATUS.success });
        }
      })
      .catch(err => {
        if (err.response) {
          this.setState({
            err: err.response.data.msg,
            pageStatus: PAGESTATUS.err
          });
        } else {
          this.setState({
            err:
              "Ops! Sorry something happened on the server, please try again later",
            pageStatus: PAGESTATUS.err
          });
        }
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

  renderByStatus() {
    const {
      errors,
      err,
      msg,
      pageStatus,
      password,
      confirmPassword
    } = this.state;
    switch (pageStatus) {
      case PAGESTATUS.err:
        return (
          <div>
            <p>{err}</p>
            <Link to="/login">Go to login page</Link>
          </div>
        );
      case PAGESTATUS.success:
        return <p className="success">{msg}</p>;
      default:
        return (
          <div>
            <p>
              Hi there please enter Your new password and click submit to reset
              your password.
            </p>
            <div className="form-group">
              <Label value="Password *" />
              <Input
                className="form-control"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
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
                value={confirmPassword}
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
        );
    }
  }
  render() {
    return (
      <div>
        <h3>Reset password</h3>
        <div className="login-form">{this.renderByStatus()}</div>
      </div>
    );
  }
}

export default ResetPassword;
