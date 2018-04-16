import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Teacher from './Teacher';
import Training from './Training';
import About from "./About";
import Projects from "./Projects";
import "./style.css";

export default class NavPages extends Component {
  render() {
    return (
      <Switch>
        {/* <Route exact path="/teachers" component={Teacher} />
        <Route exact path="/training" component={Training} />
        <Route exact path="/about" component={About} />
        <Route exact path="/projects" component={Projects} /> */}
      </Switch>
    );
  }
}
