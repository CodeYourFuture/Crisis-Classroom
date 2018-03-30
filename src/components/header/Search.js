import React, { Component } from "react";

import { Route } from "react-router-dom";

export default class Search extends Component {
  render() {
    return (
      <Route>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </Route>
    );
  }
}
