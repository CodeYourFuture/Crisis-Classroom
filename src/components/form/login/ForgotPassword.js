import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Input from "../../input";
import Button from "../../button";
import Label from "../../label";
import axios from "axios";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = () => {
    const { email } = this.state;
    axios
      .post("http://localhost:8080/forgot-password", {
        email
      })
      .then(result => {
        console.log(result, "hello");
    })
    .catch(err => {
        console.log(err);
    });
    this.props.history.replace("/");
  };
  render() {
    return (
      <div>
        <h3>Enter your email</h3>
        <div className="login-form">
          <form onSubmit={this.onSubmit}>
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
            </div>
            <Button className="btn btn-outline-dark" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
