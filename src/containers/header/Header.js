import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="App-header sticky-top py-1">
          <div className="container d-flex flex-column flex-md-row justify-content-between">
            <a className="py-2 d-none d-md-inline-block" href="/">
              Training
            </a>
            <a className="py-2 d-none d-md-inline-block" href="/">
              Teachers
            </a>
            <a className="py-2 d-none d-md-inline-block" href="">
              Projects
            </a>
            <a className="py-2 d-none d-md-inline-block" href="/">
              News
            </a>
            <a className="py-2 d-none d-md-inline-block" href="/">
              About
            </a>
            <a className="py-2 d-none d-md-inline-block" href="/">
              Contact
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
