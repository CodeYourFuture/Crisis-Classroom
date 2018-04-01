import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/LogIn";
import Register from "./screens/Register";

class Body extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/Register" component={Register} />
      </div>
    );
  }
}

export default Body;
