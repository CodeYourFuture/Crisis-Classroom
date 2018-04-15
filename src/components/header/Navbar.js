import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./Style.css";
// import { Button } from "antd";

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
                  projects
              </Link>
              </li>

              <li className="nav-item dropdown">
              
                <Link 
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
               to="/about">
                    About
                 </Link>

              
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

