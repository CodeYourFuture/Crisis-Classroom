import React, { Component } from "react";
import { Link } from "react-router-dom";
import Input from "../../input";
import Button from "../../button";
import Label from "../../label";
import AuthService from "../../../Auth/AuthService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };

    // this.Auth = new AuthService();
    this.Auth = AuthService;
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace("/");
  }
  onSubmit = e => {
    e.preventDefault();

    this.Auth.login(this.state.userName, this.state.password)
      .then(res => {
        this.props.history.replace("/welecome");
      })
      .catch(err => {
        alert(err);
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    console.log(this.Auth.state.err)
    return (
      <div className="lesson-form">
        <h3>To See Templates Please LogIn</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <Label value="User Name" />
            <Input
              className="form-control"
              name="userName"
              type="text"
              placeholder="UserName"
              value={this.state.userName}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <h5>Forgotten password?</h5>

            <div className="row">
            &nbsp;
            &nbsp;
              <Button
                className="btn btn-outline-dark"
                value="LogIn"
              />
              &nbsp;
              <Link to="/register" className="btn btn-outline-dark">
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
