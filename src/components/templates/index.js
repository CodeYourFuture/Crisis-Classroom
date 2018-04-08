import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Fakedb from "../../data/Fakedb.json";
import TemplatesList from './TemplatesList'
import FirstPage from './FirstPage'
import "./style.css";

export default class TemplatIndex extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/templates" component={TemplatesList} />
        <Route path="/templates/:id" component={FirstPage} />
      </Switch>
    );
  }
}
