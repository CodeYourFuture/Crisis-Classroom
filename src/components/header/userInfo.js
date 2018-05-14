import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Style.css";
import Button from "../button";
import AuthService from "../../Auth/AuthService";

// const Auth = new AuthService();

class userInfo extends Component {
  onLogOut = () => {
    // console.log(AuthService.)
    AuthService.logout();
    this.props.history.replace("/");
  };
  onClick = () => {
    alert("Hope to see you soon.");
  };
  render() {
    return (
      <div className="user-info">
        <div className="user-info-items">
          <Link to="/templates" className="btn btn-outline-success">
            Templates
          </Link>
          {AuthService.loggedIn() ? (
            <Button
              className="btn btn-outline-success"
              value="Log out"
              onClick={this.onLogOut}
            />
          ) : (
            <Link to="/register" className="btn btn-outline-success">
              Register
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default userInfo;
