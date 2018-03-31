import React, { Component } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import "./App.css";

import Header from "../src/containers/header/Header";
import Home from "../src/containers/home/Home";
import Footer from "../src/containers/footer/Footer";

class CrisisClassrom extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <div className="row">
              <div className="col">
                <Header />
                <Home />
               

                <Footer />
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default CrisisClassrom;
