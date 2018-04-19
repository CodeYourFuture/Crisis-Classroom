import React, { Component } from "react";
import { Switch } from "react-router-dom";

import Layout from "../layout";
import Home from "../containers/Home";
import Register from "../containers/Register";
import Template from "../containers/Templates";
import Login from "../components/form/login/form";
import LessonForm from "../components/form/templet/newTemplet";
import Welecome from "../components/text/welecome";
import Teacher from "../../src/components/text/Teacher";
import Training from "../../src/components/text/Training";
import About from "../../src/components/text/About";
import Projects from "../../src/components/text/Projects";
import News from "../../src/components/text/News";
import AuthLayout from "../../src/routes/Routes";
import Meet from "../../src/components/text/Meet";
import Day1 from "../../src/components/text/Day1";

import "./style.css";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Layout exact path="/teachers" component={Teacher} />
        <Layout path="/training" component={Training} />
        <Layout path="/training/day1" component={Day1} />
        <Layout path="/news" component={News} />
        <Layout path="/about" component={About} />
        <Layout path="/meettheteam" component={Meet} />
        <Layout  path="/projects" component={Projects} />
        <Layout exact path="/" component={Home} />
        <Layout path="/login" component={Login} />
        <Layout exact path="/register" component={Register} />
        <Layout exact path="/add-new-templet" component={LessonForm} />
        <Layout exact path="/welecome" component={Welecome} />
        <AuthLayout component={Template} />
      </Switch>
    );
  }
}



export default Routes;
