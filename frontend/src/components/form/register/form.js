import React from "react";
import Input from "../../input";
import PasswordMask from "react-password-mask";
import Label from "../../label";
import { Link } from "react-router-dom";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errors: {
        first_name: null,
        sur_name: null,
        user_name: null,
        email: null,
        password: null,
        confirmPassword: null
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    if (errors) {
      this.setState({ errors });
    }
  };

  validate() {
    const {
      first_name,
      sur_name,
      user_name,
      email,
      password,
      confirmPassword,
      checkuser_name,
      checkEmail
    } = this.props.userData;

    const errors = {
      first_name: null,
      sur_name: null,
      user_name: null,
      email: null,
      password: null,
      confirmPassword: null
    };

    if (user_name === checkuser_name) {
      errors.user_name = `This user_name already taken .`;
    } else if (email === checkEmail) {
      errors.email = `This email already exists .`;
    } else if (first_name.length <= 0) {
      errors.first_name = `First Name can't be empty. `;
    } else if (sur_name.length <= 0) {
      errors.sur_name = `sur_name can't be empty. `;
    } else if (user_name.length <= 0) {
      errors.user_name = `user_name can't be empty .`;
    } else if (email.length < 5) {
      errors.email = ` Email should be at least 5 charcters long .`;
    } else if (email.split("").filter(x => x === "@").length !== 1) {
      errors.email = `Email should contain a @ .`;
    } else if (email.indexOf(".") === -1) {
      errors.email = `Email should contain at least one dot .`;
    } else if (password.length === 0) {
      errors.password = `Password field is required .`;
    } else if (password.length < 6) {
      errors.password = `Password should be at least 6 characters long .`;
    } else if (confirmPassword.length === 0) {
      errors.confirmPassword = `Confirm password field is required .`;
    } else if (confirmPassword.length < 6) {
      errors.confirmPassword = `Password should be at least 6 characters long .`;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = `Passwords do not mach .`;
    } else {
      this.props.onFormSubmit();
    }
    return errors;
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="registraton-form">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <select
              name="title"
              value={this.props.userData.title}
              onChange={this.props.handleChange}
              className="form-control"
            >
              <option>Title</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Ms">Ms</option>
              <option value="Miss">Miss</option>
            </select>
          </div>
          <div className="form-group">
            <div>
              <Input
                className="form-control"
                name="first_name"
                type="text"
                placeholder="First Name *"
                value={this.props.userData.first_name}
                onChange={this.props.handleChange}
              />
              {errors.first_name !== null && (
                <span className="error">{errors.first_name}</span>
              )}
              <br />
              <Input
                className="form-control"
                name="sur_name"
                type="text"
                placeholder="Last name *"
                value={this.props.userData.sur_name}
                onChange={this.props.handleChange}
              />
              {errors.sur_name !== null && (
                <span className="error">{errors.sur_name}</span>
              )}
            </div>
          </div>
          <div className="form-group">
            <Input
              className="form-control"
              name="user_name"
              type="text"
              placeholder="User name *"
              value={this.props.userData.user_name}
              onChange={this.props.handleChange}
            />
            {errors.user_name !== null && (
              <span className="error">{errors.user_name}</span>
            )}
          </div>
          <div className="form-group">
            <Input
              className="form-control"
              name="email"
              type="text"
              placeholder="Email example@mail.com *"
              value={this.props.userData.email}
              onChange={this.props.handleChange}
            />
            {errors.email !== "" && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <div className="form-group">
            <PasswordMask
              name="password"
              type="password"
              placeholder="Password *"
              value={this.props.userData.password}
              onChange={this.props.handleChange}
              // useVendorStyles={null}
            />
            {errors.password !== null && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <div className="form-group">
            <Input
              className="form-control"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Your Password *"
              onChange={this.props.handleChange}
            />
            {errors.confirmPassword !== null && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
          <div className="form-group">
            <Input
              className="form-control"
              name="uuid"
              type="text"
              placeholder="UUID"
              value={this.props.userData.uuid}
              onChange={this.props.handleChange}
            />
            {/* {errors.user_name !== null && (
              <span className="error">{errors.user_name}</span>
            )} */}
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="4"
              cols="50"
              name="about_user"
              form="usrform"
              placeholder="About you..."
              onChange={this.props.handleChange}
              value={this.props.userData.about_user}
            />
          </div>
          <button className="btn btn-info btn-block" type="submit">
            Register
          </button>
        </form>
      </div>
    );
  }
}
