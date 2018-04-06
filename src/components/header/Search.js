import React, { Component } from "react";

import { Route } from "react-router-dom";
import "./Style.css";

export default class Search extends Component {
  render() {
    return (
      <Route>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </Route>
    );
  }
}
