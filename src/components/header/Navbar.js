import React, { Component } from "react";

import { Route, Link } from "react-router-dom";
import "./Style.css";

export default class NavbarFeatures extends Component {
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
                <a
                  className="nav-link"
                  href="https://www.crisisclassroom.com/training"
                >
                  Training <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://www.crisisclassroom.com/teachers"
                >
                  Teachers
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://www.crisisclassroom.com/projects"
                >
                  Projects
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="https://www.crisisclassroom.com/about"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  About
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a
                    className="dropdown-item"
                    href="https://www.crisisclassroom.com/about/meet-the-team"
                  >
                    Meet the team
                  </a>
                  <a
                    className="dropdown-item"
                    href="https://www.crisisclassroom.com/about/what-we-do"
                  >
                    What we do
                  </a>
                  <div className="dropdown-divider" />
                  <a
                    className="dropdown-item"
                    href="https://www.crisisclassroom.com/about/our-supporters"
                  >
                    Our supporters
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <Link to="/templates" className="nav-link">
                  Templates
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-brand" to="/login">
                  <div>Login</div>
                </Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0 form">
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
            </form>
          </div>
        </nav>
      </Route>
    );
  }
}
