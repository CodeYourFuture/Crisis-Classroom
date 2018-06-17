import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Style.css";
import Button from "../button";
import AuthService from "../../Auth/AuthService";

class userInfo extends Component {
  onLogOut = () => {
    AuthService.logout();
    this.props.history.replace("/");
  };

  render() {
    return (
      <div className="user-info">
        <div className="user-info-items">
          {AuthService.loggedIn() ? (
            <Button
              className="btn btn-outline-success"
              value="Log Out"
              onClick={this.onLogOut}
            />
          ) : (
            <div className="user-info-items">
              <Link to="/login" className="nav-link">
                LogIn
              </Link>
              &nbsp;
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default userInfo;
