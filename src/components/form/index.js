import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./login/index";
import Register from "./register/index";

export default class Usesrs extends React.Component {
  render() {
    return (
      <BrowserRouter >
        <Switch>
          <Route path="/login" render={() => <Login />} />
          <Route path="/register" render={() => <Register />} />
        </Switch>
      </BrowserRouter>
    );
  }
}
