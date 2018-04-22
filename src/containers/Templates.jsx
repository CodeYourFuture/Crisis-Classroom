import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import TemplatesList from "../components/templates/TemplatesList";
import FirstPage from "../components/templates/FirstPage";
import "./style.css";

export default class Templates extends Component {
  render() {
    const {match} = this.props
    return (
      <Switch>
        <Route exact path="/templates" component={TemplatesList} />
        <Route exact path="/templates/:id" component={FirstPage} />
        <Redirect to={match.path}/>
      </Switch>
    );
  }
}
