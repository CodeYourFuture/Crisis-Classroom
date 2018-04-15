import React, { Component } from "react";
import { Switch } from "react-router-dom";

import Layout from "../layout"
import Home from "../containers/Home";
import Login from "../components/form/login/form";
import Register from "../containers/Register";
import Template from "../containers/Templates";
import LessonForm from "../components/form/templet/newTemplet";
import Welecome from "../components/text/welecome";
import NavPages from "../components/text/index";

import "./style.css";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Layout exact path="/" component={Home} />
        <Layout path="/login" component={Login} />
        <Layout exact path="/register" component={Register} />
        <Layout exact path="/templates" component={Template} />
        <Layout exact path="/add-new-templet" component={LessonForm} />
        <Layout exact path="/welecome" component={Welecome} />
        <Layout component={NavPages} />
      </Switch>
    );
  }
}

export default Routes;
