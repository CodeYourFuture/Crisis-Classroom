import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Login from "./LogIn";
import Register from "./Register";
// import Link from "../components/uploads/upload";
import Template from "./Templates";

class Body extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/Register" component={Register} />
        {/* <Route path="/uploads" component= {Link} /> */}
        <Route path="/templates" component={Template} />
      </div>
    );
  }
}

export default Body;
