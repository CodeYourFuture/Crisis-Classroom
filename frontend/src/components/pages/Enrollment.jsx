import React, { Component } from "react";
import Login from "../form/login/form";
import Registration from "../form/register/index";
import AuthService from "../../Auth/AuthService";

class Enrollment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    };
  }
  onClick = e => {
    this.setState({ login: e });
  };
  render() {
    const { login } = this.state;
    return (
      <div className="container">
        <div className="enrollment">
          {!AuthService.loggedIn() && (
            <div>
              <button
                className="btn btn-info btnblock"
                onClick={() => this.onClick(true)}
              >
                Login
              </button>
              <button
                className="btn btn-info btnblock"
                onClick={() => this.onClick(false)}
              >
                Register
              </button>
            </div>
          )}
          {login ? (
            <Login history={this.props.history} />
          ) : (
            <Registration history={this.props.history} />
          )}
        </div>
      </div>
    );
  }
}

export default Enrollment;
