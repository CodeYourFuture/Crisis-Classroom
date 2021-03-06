import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Input from "../../input";
import Button from "../../button";
import Label from "../../label";
import AuthService from "../../../Auth/AuthService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: "",
      msg: "",
      user_name: "",
      password: ""
    };
    this.Auth = AuthService;
  }

  UNSAFE_componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace("/");
  }
  onSubmit = e => {
    e.preventDefault();

    this.Auth.login(this.state.user_name, this.state.password)
      .then(res => {
        if (res.sucess) {
          window.location.reload(true);
        }
      })
      .catch(err => {
        if (err.msg) {
          this.setState({ err: err.msg });
        } else {
          this.setState({
            err:
              "Sorry something happened on the server, please try again later"
          });
        }
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { err } = this.state;
    return (
      <div>
        <div className="login-form">
          <div>
           {err && <p className="error">{err}</p>}
          </div>
          <div>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <Label value="User name *" />
                <Input
                  className="form-control"
                  name="user_name"
                  type="text"
                  placeholder="User name"
                  value={this.state.user_name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <Label value="Password *" />
                <Input
                  className="form-control"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="Forgotten-password" onClick={() => this.props.onClick("Forgotten-password")}>Forgotten password?</div>
              <div className="form-group">
                &nbsp;
                <Button className="btn btn-info btn-block" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
