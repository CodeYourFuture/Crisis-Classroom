import React, { Component } from "react";
import { Switch } from "react-router-dom";

import Layout from "../layout";
import Home from "../containers/Home";
import Register from "../components/form/register/index";
import Templates from "../containers/Templates.jsx";
import Login from "../components/form/login/form";
import LessonForm from "../components/form/templet/newTemplet";
import Welecome from "../components/pages/welecome";
import PrivateRoute from "../layout/PrivateRoute";
import Teacher from "../components/navbarPages/Teacher";
import Training from "../components/navbarPages/Training";
import About from "../components/navbarPages/About";
import Projects from "../components/navbarPages/Projects";
import NotFound from "../components/pages/notFound";
import "./style.css";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Layout exact path="/" component={Home} />
        <Layout exact path="/login" component={Login} />
        <Layout exact path="/teachers" component={Teacher} />
        <Layout exact path="/training" component={Training} />
        <Layout exact path="/about" component={About} />
        <Layout exact path="/projects" component={Projects} />
        <Layout exact path="/add-new-templet" component={LessonForm} />
        <Layout exact path="/welecome" component={Welecome} />
        <Layout exact path="/notfound" component={NotFound} />
        <Layout exact path="/register" component={Register} />
        <PrivateRoute path="/templates" component={Templates} />
      </Switch>
    );
  }
}

export default Routes;
