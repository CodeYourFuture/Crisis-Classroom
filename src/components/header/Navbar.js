import React, { Component } from "react";

import { Route, Link } from "react-router-dom";
import "./Style.css";

export default class NavbarFeatures extends Component {
  render() {
    return (
      <Route>
        <nav className="navbar navbar-expand-lg nb">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item tm">
                <Link to="/">
                  <div
                    className="py-2 d-none d-md-inline-block tr"
                  >
                    Home
                  </div>
                </Link>
              </li>
              <li className="nav-item tm">
                <a
                  className="py-2 d-none d-md-inline-block tr"
                  href="https://www.crisisclassroom.com/training"
                >
                  Training
                </a>
              </li>
              <li className="nav-item tm">
                <a
                  className="py-2 d-none d-md-inline-block tr"
                  href="https://www.crisisclassroom.com/teachers"
                >
                  Teachers
                </a>
              </li>
              <li className="nav-item tm">
                <a
                  className="py-2 d-none d-md-inline-block tr"
                  href="https://www.crisisclassroom.com/projects"
                >
                  Projects
                </a>
              </li>
              <li className="nav-item dropdown tm">
                <a
                  className="py-2 d-none d-md-inline-block dropdown-toggle tr"
                  href="/"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  About
                </a>
                <ul className="dropdown-menu tr">
                  <li className="li">
                    <a href="https://www.crisisclassroom.com/about/meet-the-team">
                      Meet the team
                    </a>
                  </li>
                  <li className="li">
                    <a href="https://www.crisisclassroom.com/about/what-we-do">
                      What we do
                    </a>
                  </li>
                  <li className="li">
                    <a href="https://www.crisisclassroom.com/about/our-supporters">
                      Our supporters
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </Route>
    );
  }
}
