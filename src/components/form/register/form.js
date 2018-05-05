import React from "react";
import Input from "../../input";
import PasswordMask from "react-password-mask";
// import Button from "../../button";
import Label from "../../label";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errors: {
        firstName: null,
        surName: null,
        userName: null,
        email: null,
        password: null,
        confirmPassword: null
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    if (errors.userName !== null) {
      this.setState({ errors });
    } else if (errors.firstName !== null) {
      this.setState({ errors });
    } else if (errors.surName !== null) {
      this.setState({ errors });
    } else if (errors.email !== null) {
      this.setState({ errors });
    } else if (errors.password !== null) {
      this.setState({ errors });
    } else if (errors.confirmPassword !== null) {
      this.setState({ errors });
    } else {
      this.props.onFormSubmit();
    }
  };

  validate() {
    const {
      firstName,
      surName,
      userName,
      email,
      password,
      confirmPassword,
      checkUserName,
      checkEmail
    } = this.props.userData;

    const errors = {
      firstName: null,
      surName: null,
      userName: null,
      email: null,
      password: null,
      confirmPassword: null
    };

    if (userName === checkUserName) {
      errors.userName = `/ This user name already taken .`;
    }
    if (email === checkEmail) {
      errors.email = `/ This email already exist .`;
    }

    if (firstName.length <= 0) {
      errors.firstName = `/ First Name can't be empty. `;
    }
    if (surName.length <= 0) {
      errors.surName = `/ Sure Name can't be empty. `;
    }

    if (userName.length <= 0) {
      errors.userName = `/ user Name can't be empty .`;
    }

    if (email.length < 5) {
      errors.email =
        `/  Email should be at least 5 charcters long .` + errors.email;
    }
    if (email.split("").filter(x => x === "@").length !== 1) {
      errors.email = `/ Email should contain a @ .` + errors.email;
    }
    if (email.indexOf(".") === -1) {
      errors.email = `/ Email should contain at least one dot .` + errors.email;
    }

    if (password.length < 6) {
      errors.password = `/ Password should be at least 6 characters long .`;
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = `/ Passwords does not mach .`;
    }
    return errors;
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="lesson-form">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <Label value="Full Name" />
            <div>
              <Input
                className="form-control"
                name="firstName"
                type="text"
                placeholder="First name"
                value={this.props.userData.firstName}
                onChange={this.props.handleChange}
              />
              {errors.firstName !== null && (
                <span className="error">{errors.firstName}</span>
              )}
              <Input
                className="form-control"
                name="surName"
                type="text"
                placeholder="Last name"
                value={this.props.userData.surName}
                onChange={this.props.handleChange}
              />
              {errors.surName !== null && (
                <span className="error">{errors.surName}</span>
              )}
            </div>
          </div>
          <div className="form-group">
            <Label value="User Name" />
            <Input
              className="form-control"
              name="userName"
              type="text"
              placeholder="UserName"
              value={this.props.userData.userName}
              onChange={this.props.handleChange}
            />
            {errors.userName !== null && (
              <span className="error">{errors.userName}</span>
            )}
          </div>
          <div className="form-group">
            <Label value="Email" />
            <Input
              className="form-control"
              name="email"
              type="text"
              placeholder="Email"
              value={this.props.userData.email}
              onChange={this.props.handleChange}
            />
            {errors.email !== "" && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <div className="form-group">
            <Label value="Password" />
            <PasswordMask
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              value={this.props.userData.password}
              onChange={this.props.handleChange}
              // useVendorStyles={null}
            />
            {errors.password !== null && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <div className="form-group">
            <Label value="Confirm Your Password" />
            <Input
              className="form-control"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Your Password"
              value={this.props.userData.confirmPassword}
              onChange={this.props.handleChange}
            />
            {errors.confirmPassword !== null && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
          <button
            className="btn btn-outline-dark"
            value="Register"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}
