import React, { Component } from "react";
import Input from "../../input";
import Button from "../../button";
import Label from "../../label";
import axios from "axios";
const PAGESTATUS = { none: 0, err: 1, success: 2 };
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      msg: null,
      err:"",
      pageStatus: PAGESTATUS.none,
      errors: {
        email: null
      }
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onFormSubmit = () => {
    const { email } = this.state;
    axios
      .post("http://localhost:8080/forgot-password", {
        email
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
    const { email } = this.state;

    const errors = {
      email: null
    };
    if (email.length < 5) {
      errors.email = ` Email should be at least 5 charcters long .`;
    } else if (email.split("").filter(x => x === "@").length !== 1) {
      errors.email = `Email should contain a @ .`;
    } else if (email.indexOf(".") === -1) {
      errors.email = `Email should contain at least one dot .`;
    } else {
      this.onFormSubmit();
    }
    return errors;
  }
  renderByStatus() {
    const { errors, err, msg, pageStatus, email } = this.state;
    switch (pageStatus) {
      case PAGESTATUS.err:
        return <p className="errors">{err}</p>;
      case PAGESTATUS.success:
        return <p className="success">{msg}</p>;
      default:
        return (
          <div>
            <h3>Enter your email</h3>
            <div className="form-group">
              <Label value="Email *" />
              <Input
                className="form-control"
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={this.handleChange}
              />
              {errors.email !== "" && (
                <span className="error">{errors.email}</span>
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
        <div className="login-form">{this.renderByStatus()}</div>
    );
  }
}

export default ForgotPassword;
