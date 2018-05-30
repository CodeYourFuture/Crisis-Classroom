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
      data: false,
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
        const data = result.data;
        if (data) {
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
  render() {
    const data = this.state.data;
    const { errors } = this.state;
    return (
      <div>
        <h3>Enter your email</h3>
        <div className="login-form">
          {data ? (
            <p className="errors">{this.state.data}</p>
          ) : (
            <div>
              <div className="form-group">
                <Label value="Email *" />
                <Input
                  className="form-control"
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={this.state.email}
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
          )}
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
