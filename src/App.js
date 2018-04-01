import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import Header from "../src/components/header/Index";
import Body from "../src/containers/index";
import Footer from "../src/components/Footer";

class CrisisClassrom extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Body />
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default CrisisClassrom;
