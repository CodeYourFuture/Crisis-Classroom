import React, { Component } from "react";
import { Switch } from "react-router-dom";

import Layout from "../layout";
import Home from "../containers/Home";
import Register from "../components/form/register/index";
import Templates from "../containers/Templates.jsx";
import Login from "../components/form/login/form";
import LessonForm from "../components/form/templats/index";
import News from "../../src/components/pages/News";
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
import NotFound from "../components/pages/notFound";
import Survey from "../components/pages/Survey";
import RegistrationDone from "../components/form/register/Registration-done";
import ImageUploader from "../components/imageUploader";
import TemplateCreated from "../components/form/templats/templateCreated";
import TemplateEdited  from "../components/form/templats/templateEdited";
import TemplateDeleted  from "../components/templates/templateDeleted";
import ForgotPassword from "../components/form/login/ForgotPassword";
import CheckUserToken from "../components/form/login/checkUserToken";
import ResetPassword from "../components/form/login/ResetPassword";
import Adminpage from "../layout/adminPage";
import AcceptRegistration from "../components/admin/AcceptRegistration";
import CheckRegistrationToken from "../components/admin/CheckRegistrationToken";



class Routes extends Component {
  render() {
    return (
      <Switch>
        <Layout exact path="/teachers" component={Teacher} />
        <Layout exact path="/training" component={Training} />
        <Layout exact path="/training/day-one" component={Day1} />
        <Layout exact path="/training/day-two" component={Day2} />
        <Layout exact path="/training/day-three" component={Day3} />
        <Layout exact path="/news" component={News} />
        <Layout exact path="/about" component={About} />
        <Layout exact path="/meettheteam" component={Meet} />
        <Layout exact path="/projects" component={Projects} />
        <Layout exact path="/" component={Home} />
        <Layout exact path="/survey" component={Survey} />
        <Layout exact path="/login" component={Login} />
        <PrivateRoute exact path="/add-new-templet" component={LessonForm} />
        <Layout path="/register" component={Register} />
        <PrivateRoute exact path="/welecome" component={Welecome} />
        <Layout exact path="/notfound" component={NotFound} />
        <PrivateRoute exact path="/image-uploader" component={ImageUploader} />
        <Layout exact path="/registration-done" component={RegistrationDone} />
        <Layout exact path="/forgot-password" component={ForgotPassword} />
        <Layout exact path="/reset-password/:token" component={CheckUserToken} />
        <Layout exact path="/reset-password" component={ResetPassword} />
        <PrivateRoute exact path="/template-created" component={TemplateCreated} />
        <PrivateRoute exact path="/template-edited" component={TemplateEdited} />
        <PrivateRoute exact path="/template-deleted" component={TemplateDeleted} />
        <PrivateRoute path="/templates" component={Templates} />
        <Adminpage exact path="/accept-registration/:token" component={CheckRegistrationToken} />
        <Adminpage exact path="/accept-registration" component={AcceptRegistration} />
      </Switch>
    );
  }
}

export default Routes;
