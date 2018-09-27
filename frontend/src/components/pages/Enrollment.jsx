import React, { Component } from "react";
import Login from "../form/login/form";
import Registration from "../form/register/index";
import AuthService from "../../Auth/AuthService";
import ForgotPassword from "../form/login/ForgotPassword"

class Enrollment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toShow: "Login"
    };
  }
  onClick = e => {
    this.setState({ toShow: e });
  };
  render() {
    const { toShow } = this.state;
    return (
      <div className="container">
        <div className="enrollment">
          {!AuthService.loggedIn() && (
            <div>
              <button
                className="btn btn-info btnblock"
                onClick={() => this.onClick("Login")}
              >
                Login
              </button>
              <button
                className="btn btn-info btnblock"
                onClick={() => this.onClick("Register")}
              >
                Register
              </button>
            </div>
          )}
          {toShow==="Register" && <Registration history={this.props.history} />}
          {toShow==="Login" && <Login history={this.props.history} onClick={this.onClick} />}
          {toShow==="Forgotten-password" && <ForgotPassword history={this.props.history} />}
        </div>
      </div>
    );
  }
}

export default Enrollment;
