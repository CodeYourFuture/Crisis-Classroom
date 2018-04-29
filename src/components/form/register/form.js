import React from "react";
import Input from "../../input";
import Button from "../../button";
import Label from "../../label";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errors: [],
      checkUser: [],
      checkUserName: [],
      checkEmail: ""
    };
  }

  componentDidMount() {
    fetch(`http://localhost:8080/check-users`)
      .then(res => res.json())
      .then(Data => {
        this.setState({ checkUser: Data.status });
      })
      .catch(error => {
        this.setState({
          error
        });
      });
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
    } = this.props.state;

    const check = this.state.checkUser;
    check.forEach(check => {
      if (userName === check.userName) {
        this.setState({ checkUserName: "This user name already taken" });
      }
      if (email === check.email) {
        this.setState({ checkEmail: "This email already exist" });
      }
    });

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
    } else {
      this.props.history.replace("/confirm-registration");
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="lesson-form">
        {errors.map(error => (
          <p className="error" key={error}>
            {error}
          </p>
        ))}
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
            <p className="error">{this.state.checkUserName}</p>
          </div>
          <div className="form-group">
            <Label value="Email" />
            <Input
              className="form-control"
              name="email"
              type="text"
              placeholder="Email"
              value={this.props.state.email}
              onChange={this.props.handleChange}
            />
            <p className="error">{this.state.checkEmail}</p>
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

function validate(
  firstName,
  surName,
  userName,
  email,
  password,
  confirmPassword
) {
  const errors = [];

  if (firstName.length <= 0) {
    errors.push("First Name can't be empty");
  }
  if (surName.length <= 0) {
    errors.push("Sure Name can't be empty");
  }

  if (userName.length <= 0) {
    errors.push("user Name can't be empty");
  }

  if (email.length < 5) {
    errors.push("Email should be at least 5 charcters long");
  }
  if (email.split("").filter(x => x === "@").length !== 1) {
    errors.push("Email should contain a @");
  }
  if (email.indexOf(".") === -1) {
    errors.push("Email should contain at least one dot");
  }

  if (password.length < 6) {
    errors.push("Password should be at least 6 characters long");
  }
  if (password !== confirmPassword) {
    errors.push("Passwords does not mach");
  }

  return errors;
}
