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
      password: ""
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
    const { firstName, surName, userName, email, password } = this.state;

    axios
      .post("http://localhost:8001/api/register", {
        firstName,
        surName,
        userName,
        email,
        password
      })
      .then(result => {
        console.log(result);
      });
  };

  render() {
    const { firstName, surName, userName, email, password } = this.state;
    const isEnabled =
      email.length > 0 &&
      password.length > 0 &&
      firstName.length > 0 &&
      surName > 0 &&
      userName > 0;
    return (
      <div className="lesson-form">
        <h1>Register</h1>
        <form>
          <div className="form-group">
            <Label value="Full Name" />
            <div>
              <Input
                name="firstName"
                type="text"
                placeholder="First name"
                value={this.state.firstName}
                onChange={e => this.change(e)}
                required
              />
              <Input
                name="surName"
                type="text"
                placeholder="Last name"
                value={this.state.surName}
                onChange={e => this.change(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <Label value="User Name" />
            <Input
              name="userName"
              type="text"
              placeholder="UserName"
              value={this.state.userName}
              onChange={e => this.change(e)}
            />
          </div>
          <div className="form-group">
            <Label value="Email" />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.change(e)}
            />
          </div>
          <div className="form-group">
            <Label value="Password" />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.change(e)}
            />
          </div>
          <Link to="/">
            <Button
              className="btn btn-primary"
              onClick={this.onSubmit}
              value="Register"
              disabled={!isEnabled}
            />
          </Link>
        </form>
      </div>
    );
  }
}
