import React, { Component } from "react";
import Input from "../../input";
import Button from "../../button";
import Label from "../../label";
import axios from "axios";
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      msg: null,
      err: "",
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
      .post(`${process.env.REACT_APP_DOMAIN}/forgot-password`, {
        email
      })
      .then(result => {
        if (result.data) {
          const msg = result.data;
          this.setState({ msg });
        }
      })
      .catch(err => {
        if (err) {
          this.setState({
            err:
              "Sorry something happened on the server, please try again later"
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
    const { errors, err, msg, email } = this.state;
    return (
      <div>
        {err && <p className="errors">{err}</p>}
        {msg ? (
          <p className="success">{msg}</p>
        ) : (
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
              className="btn btn-info btn-block"
              value="Submit"
              onClick={this.onSubmit}
            />
          </div>
        )}
      </div>
    );
  }
  render() {
    return <div className="login-form">{this.renderByStatus()}</div>;
  }
}

export default ForgotPassword;
