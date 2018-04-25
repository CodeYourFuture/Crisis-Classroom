// import validator from "react-validation";
import React from "react";
import Input from "../../input";
import Button from "../../button";
import Label from "../../label";
import Registration from "./Registration";
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
      confirmPassword: "",
      passwordMach: null,
      errors: []
    };
  }
  // change = e => {
  //   const {
  //     firstName,
  //     surName,
  //     userName,
  //     email,
  //     password,
  //     confirmPassword
  //   } = this.state;
  //   const errors = validate(
  //     firstName,
  //     surName,
  //     userName,
  //     email,
  //     password,
  //     confirmPassword
  //   );
  //   if (errors.length > 0) {
  //     this.setState({ errors });
  //     return;
  //   }
  //   // this.setState({
  //   //   [e.target.name]: e.target.value
  //   // });
  // };
  handleSubmit = e => {
    e.preventDefault();
    const {
      firstName,
      surName,
      userName,
      email,
      password,
      confirmPassword
    } = this.state;
    const errors = validate(
      firstName,
      surName,
      userName,
      email,
      password,
      confirmPassword
    );
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }
  };

  onSubmit = () => {
    const {
      firstName,
      surName,
      userName,
      email,
      password,
      confirmPassword
    } = this.state;

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
        console.log(error);
      });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="lesson-form">
        {errors.map(error => <p key={error}>Error: {error}</p>)}
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <Label value="Full Name" />
            <div>
              <Input
                className="form-control"
                name="firstName"
                type="text"
                placeholder="First name"
                value={this.state.firstName}
                onChange={evt => this.setState({ firstName: evt.target.value })}
              />
              <Input
                className="form-control"
                name="surName"
                type="text"
                placeholder="Last name"
                value={this.state.surName}
                onChange={evt => this.setState({ surName: evt.target.value })}
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
              onChange={evt => this.setState({ userName: evt.target.value })}
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
              onChange={evt => this.setState({ email: evt.target.value })}
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
              onChange={evt => this.setState({ password: evt.target.value })}
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
              onChange={evt =>
                this.setState({ confirmPassword: evt.target.value })
              }
            />
            <h6>{this.state.passwordMach}</h6>
          </div>
          <Button className="btn btn-outline-dark" value="Register" />
        </form>
        <Registration state={this.state} onSubmit={this.onSubmit}/>
      </div>
    );
  }
}

function validate(userName, email, password) {
  const errors = [];

  if (userName.length === 0) {
    errors.push("user Name can't be empty");
  }

  if (email.length < 5) {
    errors.push("Email should be at least 5 charcters long");
  }
  // if (email.split("").filter(x => x === "@").length !== 1) {
  //   errors.push("Email should contain a @");
  // }
  // if (email.indexOf(".") === -1) {
  //   errors.push("Email should contain at least one dot");
  // }

  if (password.length < 6) {
    errors.push("Password should be at least 6 characters long");
  }

  return errors;
}
