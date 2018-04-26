import React, { Component } from "react";
import { Switch } from "react-router-dom";

import Layout from "../layout";
import Home from "../containers/Home";
import Register from "../components/form/register/form";
import Templates from "../containers/Templates.jsx";
import Login from "../components/form/login/form";
import LessonForm from "../components/form/templet/newTemplet";
import News from "../../src/components/pages/News";
import AuthLayout from "../../src/routes/Routes";
import Meet from "../../src/components/pages/Meet";
import Day1 from "../../src/components/pages/Day1";
import Day2 from "../../src/components/pages/Day2";
import Day3 from "../../src/components/pages/Day3";
import Welecome from "../components/pages/welecome";
import PrivateRoute from "../layout/PrivateRoute";
import Teacher from "../components/navbarPages/Teacher";
import Training from "../components/navbarPages/Training";
import About from "../components/navbarPages/About";
import Projects from "../components/navbarPages/Projects";
import NotFound from "../components/pages/notFound"
import "./style.css";
import Survey from "../components/pages/Survey";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Layout exact path="/teachers" component={Teacher} />
        <Layout exact path="/training" component={Training} />
        <Layout path="/training/day-one" component={Day1} />
        <Layout path="/training/day-two" component={Day2} />
        <Layout path="/training/day-three" component={Day3} />
        <Layout path="/news" component={News} />
        <Layout path="/about" component={About} />
        <Layout path="/meettheteam" component={Meet} />
        <Layout path="/projects" component={Projects} />
        <Layout exact path="/" component={Home} />
        <Layout exact path="/survey" component={Survey} />
        <Layout exact path="/login" component={Login} />
        <Layout exact path="/register" component={Register} />
        <Layout exact path="/add-new-templet" component={LessonForm} />
        <Layout exact path="/register" component={Register} />
        <Layout exact path="/welecome" component={Welecome} />
        <Layout exact path="/notfound" component={NotFound} />
        <PrivateRoute path="/templates" component={Templates} />
      </Switch>
    );
  }
}



export default Routes;

