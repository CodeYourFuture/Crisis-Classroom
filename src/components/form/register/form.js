import React from "react";
import Input from "../../input";
import Button from "../../button";
import Label from "../../label";

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
                value={this.props.state.firstName}
                onChange={this.props.handleChange}
              />
              <Input
                className="form-control"
                name="surName"
                type="text"
                placeholder="Last name"
                value={this.props.state.surName}
                onChange={this.props.handleChange}
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
              value={this.props.state.userName}
              onChange={this.props.handleChange}
            />
          </div>
          <div className="form-group">
            <Label value="Email" />
            <Input
              className="form-control"
              name="email"
              type="email"
              placeholder="Email"
              value={this.props.state.email}
              onChange={this.props.handleChange}
            />
          </div>
          <div className="form-group">
            <Label value="Password" />
            <Input
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              value={this.props.state.password}
              onChange={this.props.handleChange}
            />
          </div>
          <div className="form-group">
            <Label value="Confirm Your Password" />
            <Input
              className="form-control"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Your Password"
              value={this.props.state.confirmPassword}
              onChange={this.props.handleChange}
            />
          </div>
          <Button className="btn btn-outline-dark" value="Register" />
        </form>
      </div>
    );
  }
}

function validate(userName, email, password) {
  const errors = [];

  if (userName.length === 1) {
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
