import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./Style.css";
import AuthService from "../../Auth/AuthService";
import Button from "../button";

export default class NavbarFeatures extends Component {
  onLogOut = () => {
    AuthService.logout();
    this.props.history.replace("/");
  };

  render() {
    return (
      <Route>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            <div>Home</div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/training">
                  Training
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teachers">
                  Teachers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/projects">
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/news">
                  News
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  About
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="about" className="dropdown-item">
                    About
                  </Link>
                  <Link to="meettheteam" className="dropdown-item">
                    Meet the team
                  </Link>
                  <Link to="about" className="dropdown-item">
                    What we do
                  </Link>
                  <div className="dropdown-item dropdown-divider" />
                  Our supporters
                </div>
              </li>
              <li className="nav-item">
                <Link to="/templates" className="nav-link">
                  Templates
                </Link>
              </li>
              {AuthService.loggedIn() ? (
                <li className="nav-item">
                  <Button
                    className="log-out nav-link"
                    value="Log Out"
                    onClick={this.onLogOut}
                  />
                </li>
              ) : (
                <li className="nav-item user-info-items">
                  <Link to="/login" className="nav-link">
                    LogIn
                  </Link>
                  &nbsp;
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              )}
            </ul>
            {/* <form className="form-inline my-2 my-lg-0 form">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form> */}
          </div>
        </nav>
      </Route>
    );
  }
}
