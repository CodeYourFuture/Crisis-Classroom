import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "../components/header/Index";
import Footer from "../components/Footer";
import Home from "./Home";
import Login from "./LogIn";
import Register from "./Register";
import Template from "./Templates";
import LessonForm from "../components/form/templet/newTemplet";
import Welecome from "../components/text/welecome";
import Cookies from "js-cookie";
import "./style.css";

class Body extends Component {
  render() {
    return (
      <div className="container">
        <Router className="row">
          <div className="mainIndex">
            <Header />
            <Route exact path="/" component={Home} />
            {Cookies.get("password") ? (
              <Route
                path="/login"
                render={() => {
                  return <h1>You are Loged In</h1>;
                }}
              />
            ) : (
              <Route path="/login" component={Login} />
            )}
            {Cookies.get("password") ? (
              <Route
                path="/register"
                render={() => {
                  return <h1>You are a member</h1>;
                }}
              />
            ) : (
              <Route path="/register" component={Register} />
            )}

            {Cookies.get("password") ? (
              <Route path="/templates" component={Template} />
            ) : (
              <Route
                path="/templates"
                render={() => {
                  return <h1>Not loged In</h1>;
                }}
              />
            )}
            <Route path="/add-new-templet" component={LessonForm} />
            <Route path="/welecome" component={Welecome} />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default Body;
