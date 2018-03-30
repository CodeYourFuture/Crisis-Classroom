import React, { Component } from "react";

import { Route } from "react-router-dom";

export default class NavbarFeatures extends Component {
  render() {
    return (
      <Route>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>

          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              <li class="nav-item active">
                <a
                  class="nav-link"
                  href="https://www.crisisclassroom.com/training"
                >
                  Training <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.crisisclassroom.com/teachers"
                >
                  Teacher
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.crisisclassroom.com/projects"
                >
                  Projects
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.crisisclassroom.com/news">
                  News
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.crisisclassroom.com/about"
                >
                  About
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://www.crisisclassroom.com/contact"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </Route>
    );
  }
}
