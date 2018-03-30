import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import LoginText from "../../components/text/Login";
import Usesrs from "../../components/form/index";

class Home extends Component {
  render() {
    return (
      <div>
        <LoginText />
        <Route>
          <div>
            <Link to="/login">
              <button className="btn btn-primary">login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-primary">register</button>
            </Link>
          </div>
        </Route>
        <img src="src/image/crisis.jpg" alt="crisis image" className="crisis-image"/>
        <Usesrs />
      </div>
    );
  }
}

export default Home;
