import React, { Component } from "react";
import { Switch } from "react-router-dom";

import Layout from "../layout";
import Home from "../containers/Home";
import Register from "../components/form/register/form";
import Templates from "../containers/Templates.jsx";
import Login from "../components/form/login/form";
import LessonForm from "../components/form/templet/newTemplet";
import Welecome from "../components/navbarPages/welecome";
import Teacher from "../../src/components/navbarPages/Teacher";
import Training from "../../src/components/navbarPages/Training";
import About from "../../src/components/navbarPages/About";
import Projects from "../../src/components/navbarPages/Projects";
import News from "../../src/components/text/News";
import AuthLayout from "../../src/routes/Routes";
import Meet from "../../src/components/text/Meet";
import Day1 from "../../src/components/text/Day1";


import "./style.css";

class Routes extends Component {
  render() {
    return (<div>
      <Switch>
        <Layout exact path="/teachers" component={Teacher} />
        <Layout path="/training" component={Training}>
        <Layout path="/training/123" component={Day1} />

        </Layout>

        <Layout path="/news" component={News} />
        <Layout path="/about" component={About} />
        <Layout path="/meettheteam" component={Meet} />
        <Layout path="/projects" component={Projects} />
        <Layout exact path="/" component={Home} />
        <Layout exact path="/login" component={Login} />
        <Layout exact path="/register" component={Register} />
        <Layout exact path="/add-new-templet" component={LessonForm} />
        <Layout exact path="/welecome" component={Welecome} />
        <AuthLayout component={Templates} />
      </Switch></div>
    );
  }
}



export default Routes;
