import React, { Component } from "react";
import { Switch } from "react-router-dom";

import Layout from "../layout";
import Home from "../containers/Home";
// import Register from "../components/form/register/index";
import Templates from "../containers/Templates.jsx";
// import Login from "../components/form/login/form";
import LessonForm from "../components/form/templats/index";
import PrivateRoute from "../layout/PrivateRoute";
import NotFound from "../components/pages/notFound";
import TemplateCreated from "../components/form/templats/templateCreated";
import TemplateEdited  from "../components/form/templats/templateEdited";
// import ForgotPassword from "../components/form/login/ForgotPassword";
import CheckUserToken from "../components/form/login/checkUserToken";
import ResetPassword from "../components/form/login/ResetPassword";
import Adminpage from "../layout/adminPage";
import AcceptRegistration from "../components/admin/AcceptRegistration";
import UsersInfo from "../components/admin/UsersInfo";
import SelectUser from "../components/admin/SelectUser";
import Admin from "../components/admin/admin";
import UserProfile from "../components/users/userProfile";
import editSkill from "../components/users/editSkill";
import editExperience from "../components/users/editExperience";
import Teachers from "../containers/Teachers";


class Routes extends Component {
  render() {
    return (
      <Switch>
        <Layout exact path="/" component={Home} />
        {/* <Layout exact path="/login" component={Login} /> */}
        {/* <Layout path="/register" component={Register} /> */}
        <Layout exact path="/notfound" component={NotFound} />
        {/* <Layout exact path="/forgot-password" component={ForgotPassword} /> */}
        <Layout exact path="/reset-password/:token" component={CheckUserToken} />
        <Layout exact path="/reset-password" component={ResetPassword} />
        <PrivateRoute exact path="/add-new-template" component={LessonForm} />
        <PrivateRoute exact path="/template-created" component={TemplateCreated} />
        <PrivateRoute exact path="/template-edited" component={TemplateEdited} />
        <PrivateRoute path="/templates" component={Templates} />
        <PrivateRoute path="/user-profile" component={UserProfile} />
        <PrivateRoute path="/edit-skill/:id" component={editSkill} />
        <PrivateRoute path="/edit-experience/:id" component={editExperience} />
        <PrivateRoute path="/teachers" component={Teachers} />
        <Adminpage exact path="/accept-registration/:token" component={AcceptRegistration} />
        <Adminpage exact path="/users-info" component={UsersInfo} />
        <Adminpage exact path="/users-info/:id" component={SelectUser} />
        <Adminpage exact path="/admin" component={Admin} />
      </Switch>
    );
  }
}

export default Routes;
