import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import LoginText from "../../components/text/Login";
import Usesrs from "../../components/form/index";
import crisis from "../../image/crisis.jpg";
import '../../App.css';

class Home extends Component {
  render() {
    return (
      <div>
        <img src={crisis} alt="crisis image" className="img-responsive crisis-image "/>
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
        <Usesrs />
      </div>
    );
  }
}

export default Home;
