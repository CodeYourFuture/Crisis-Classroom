import React from "react";
import Input from "../../input";
import Button from "../../button";
import Label from "../../label";
// import { Link } from "react-router-dom";
import axios from "axios";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
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
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { firstName, surName, userName, email, password, confirmPassword } = this.state;

    axios
      .post("http://localhost:8080/register", {
        firstName,
        surName,
        userName,
        email,
        password,
        confirmPassword
      })
      .then(result => {
        console.log(result);
        this.props.history.replace("/");
      })
      .catch(error => {
        console.log(error)
      })
      
  };

  render() {
    return (
      <div className="lesson-form">
        <h1>Register</h1>
        <form onSubmit={this.onSubmit}>
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
            <Button
              className="btn btn-outline-dark"
              value="Register"
            />
        </form>
      </div>
    );
  }
}
