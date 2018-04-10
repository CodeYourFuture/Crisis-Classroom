import React from "react";
import Input from "../../input";
import Button from "../../button";
import Label from "../../label";
import { Link } from "react-router-dom";

export default class RegisterForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  };

  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // this.props.onSubmit(this.state);
    this.setState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    });
    this.props.onChange({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    });
  };

  render() {
    return (
      <div className="lesson-form">
        <h1>Register</h1>
        <form>
          <div class="form-group">
            <Label value="Full Name" />
            <div>
              <Input
                name="firstName"
                placeholder="First name"
                value={this.state.firstName}
                onChange={e => this.change(e)}
              />
              <Input
                name="lastName"
                placeholder="Last name"
                value={this.state.lastName}
                onChange={e => this.change(e)}
              />
            </div>
          </div>

          <div class="form-group">
            <Label value="User Name" />
            <Input
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={e => this.change(e)}
            />
          </div>
          <div class="form-group">
            <Label value="Email" />
            <Input
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.change(e)}
            />
          </div>
          <div class="form-group">
            <Label value="Password" />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.change(e)}
            />
          </div>
          <Link to="/register">
            <Button
              className="btn btn-primary"
              onClick={e => this.onSubmit(e)}
              value={"Register"}
            />
          </Link>
        </form>
      </div>
    );
  }
}
