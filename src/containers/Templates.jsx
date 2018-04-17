import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import TemplatesList from "../components/templates/TemplatesList";
import FirstPage from "../components/templates/FirstPage";
import "./style.css";

export default class Templates extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/templates" component={TemplatesList} />
        <Route path="/templates/:id" component={FirstPage} />
      </Switch>
    );
  }
}
