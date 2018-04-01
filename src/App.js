import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import Header from "../src/containers/header/Header";
import Body from "../src/containers/Body";
import Footer from "../src/containers/footer/Footer";

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
