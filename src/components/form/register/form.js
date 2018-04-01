import React from "react";

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
      <div>
        <form>
          <input
            className="form-control"
            name="firstName"
            placeholder="First name"
            value={this.state.firstName}
            onChange={e => this.change(e)}
          />
          <br />
          <input
            className="form-control"
            name="lastName"
            placeholder="Last name"
            value={this.state.lastName}
            onChange={e => this.change(e)}
          />
          <br />
          <input
            className="form-control"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={e => this.change(e)}
          />
          <br />
          <input
            className="form-control"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={e => this.change(e)}
          />
          <br />
          <input
            className="form-control"
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={e => this.change(e)}
          />
          <br />
          <button className="btn btn-primary" onClick={e => this.onSubmit(e)}>
            Register
          </button>
        </form>
      </div>
    );
  }
}
