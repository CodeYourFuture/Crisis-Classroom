import React from "react";
import Input from "../../input";
import Button from "../../button";
import Label from "../../label";
import { Link } from "react-router-dom";
import axios from "axios";

export default class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      surName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword:""
    };
  }
  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { firstName, surName, userName, email, password, confirmPassword } = this.state;

    axios
      .post("http://localhost:8001/api/register", {
        firstName,
        surName,
        userName,
        email,
        password,
        confirmPassword
      })
      .then(result => {
        console.log(result);
      });
  };

  render() {
    const { firstName, surName, userName, email, password, confirmPassword } = this.state;
    const isEnabled =
      email.length > 0 &&
      password.length > 0 &&
      firstName.length > 0 &&
      surName.length > 0 &&
      userName.length > 0 &&
      confirmPassword > 0;
    return (
      <div className="lesson-form">
        <h1>Register</h1>
        <form>
          <div className="form-group">
            <Label value="Full Name" />
            <div>
              <Input
                className="form-control"
                name="firstName"
                type="text"
                placeholder="First name"
                value={this.state.firstName}
                onChange={this.change}
                required
              />
              <Input
                className="form-control"
                name="surName"
                type="text"
                placeholder="Last name"
                value={this.state.surName}
                onChange={this.change}
              />
            </div>
          </div>
          <div className="form-group">
            <Label value="User Name" />
            <Input
              className="form-control"
              name="userName"
              type="text"
              placeholder="UserName"
              value={this.state.userName}
              onChange={this.change}
            />
          </div>
          <div className="form-group">
            <Label value="Email" />
            <Input
              className="form-control"
              name="email"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.change}
            />
          </div>
          <div className="form-group">
            <Label value="Password" />
            <Input
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.change}
            />
          </div>
          <div className="form-group">
            <Label value="Confirm Your Password" />
            <Input
              className="form-control"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Your Password"
              value={this.state.confirmPassword}
              onChange={this.change}
            />
          </div>
          <Link to="/">
            <Button
              className="btn btn-outline-dark"
              onClick={this.onSubmit}
              value="Register"
              disabled={isEnabled}
            />
          </Link>
        </form>
      </div>
    );
  }
}
