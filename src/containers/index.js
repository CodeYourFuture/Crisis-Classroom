import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "../components/header/Index";
import Footer from "../components/Footer";
import Home from "./Home";
import Login from "./LogIn";
import Register from "./Register";
import Template from "./Templates";
import LessonForm from "../components/form/templet/newTemplet";
import Welecome from "../components/text/welecome"
import "./style.css";

class Body extends Component {
  render() {
    return (
      <div className="container">
        <Router className="row">
          <div className="mainIndex">
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            {/* {document.cookie ? (
              <Route path="/templates" component={Template} />
            ) : (
              <h1>not loged in</h1>
            )} */}
            <Route path="/templates" component={Template} />
            <Route path="/add-new-templet" component={LessonForm} />
            <Route path="/welecome" component={Welecome}/>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default Body;
