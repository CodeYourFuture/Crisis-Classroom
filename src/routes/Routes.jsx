import React, { Component } from "react";
import { Switch } from "react-router-dom";

import Layout from "../layout";
import Home from "../containers/Home";
import Register from "../containers/Register";
import Template from "../containers/Templates";
import Login from "../components/form/login/form";
import LessonForm from "../components/form/templet/newTemplet";
import Welecome from "../components/text/welecome";
import NavPages from "../components/text/index";
import AuthLayout from "../layout/AuthLayout";
import "./style.css";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Layout exact path="/" component={Home} />
        <Layout path="/login" component={Login} />
        <Layout exact path="/register" component={Register} />
        <AuthLayout component={Template} />
        <Layout exact path="/add-new-templet" component={LessonForm} />
        <Layout exact path="/welecome" component={Welecome} />
        <Layout exact component={NavPages} />
      </Switch>
    );
  }
}

export default Routes;
