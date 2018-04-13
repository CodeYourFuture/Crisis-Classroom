import React, { Component } from "react";
import { Router } from "react-router-dom";

import Header from "../components/header/Index";
import Footer from "../components/Footer";
import { createBrowserHistory } from 'history'
import "./style.css";
import Routes from './Routes'

const history = createBrowserHistory()

class Body extends Component {
  render() {
    return (
      <div className="container">
        <Router className="row" history={history}>
          <div className="mainIndex">
          <Header />
          <Routes />
          <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default Body;
