import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "../components/header/Index";
import Footer from "../components/Footer";
import Home from "./Home";
import Login from "./LogIn";
import Register from "./Register";
// import Link from "../components/uploads/upload";
import Template from "./Templates";
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
            {/* <Route path="/uploads" component= {Link} /> */}
            <Route path="/templates/" component={Template} />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default Body;
