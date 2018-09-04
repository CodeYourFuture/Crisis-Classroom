import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../Auth/AuthService";
import Button from "../button";
import decode from "jwt-decode";
import Logo from "./Logo";

export default class NavbarFeatures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      avatar: "",
      title: null
    };
  }
  UNSAFE_componentWillMount() {
    const token = AuthService.getToken();
    if (token) {
      const decoded = decode(token);
      const { user_name, avatar, title } = decoded;
      this.setState({ user_name, avatar, title });
    }
  }
  onLogOut = () => {
    AuthService.logout();
    this.props.history.replace("/");
  };

  render() {
    const { user_name, avatar, title } = this.state;
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">
          <Logo />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link class="nav-link" to="/">
                Home
              </Link>
              <span class="sr-only">(current)</span>
            </li>
            <li class="nav-item">
              {AuthService.loggedIn() && (
                <Link class="nav-link" to="/teachers">
                  Teachers
                </Link>
              )}
            </li>
            <li class="nav-item">
              {AuthService.loggedIn() && (
                <Link class="nav-link" to="/templates">
                  Templates
                </Link>
              )}
            </li>
            <li class="nav-item">
              {AuthService.isAdmin() && (
                <Link class="nav-link" to="/admin">
                  Admin
                </Link>
              )}
            </li>
            <li class="nav-item">
              {AuthService.loggedIn() && (
                <Link class="nav-link" to="/user-profile">
                  {user_name}
                </Link>
              )}
            </li>
            <li class="nav-item">
              {AuthService.loggedIn() && (
                <div className="user-avatar-nav">
                  {!avatar ? (
                    <div>
                      {title === "Mr" ? (
                        <img
                          className="nav-image"
                          src={require("../../image/icons/man-avatar.jpg")}
                          alt="avatar"
                        />
                      ) : (
                        <img
                          className="nav-image"
                          src={require("../../image/icons/women-avatar.jpg")}
                          alt="avatar"
                        />
                      )}
                    </div>
                  ) : (
                    <img className="nav-image" src={avatar} alt="avatar" />
                  )}
                </div>
              )}
            </li>
          </ul>
          <span class="navbar-text">
            {AuthService.loggedIn() && (
              <Button
                className="btn-link"
                value="Log Out"
                onClick={this.onLogOut}
              />
            )}
          </span>
        </div>
      </nav>
    );
  }
}
