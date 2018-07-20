import React, { Component } from "react";
// import {Link} from 'react-router-dom';
import HomePageText from "../components/pages/Home";
import CrisisLogo from "../image/icons/crisis-logo.svg";
import Login from "../components/form/login/form";
import Registration from "../components/form/register/index";
import AuthService from "../Auth/AuthService";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    };
  }
  onClick = e => {
    this.setState({ login: e });
  };
  render() {
    const { login } = this.state;
    return (
      <div className="home-page">
        <br />
        <br />
        <div className="text-center">
              <img
                height="200px"
                alt="Logo crisis classroom"
                src={CrisisLogo}
              />
            </div>
        <br />

        <div className="row">
          <div className="col-md-6">


            <div className="jumbotron">
              <h1 className="homePageTexts text-center">Welcome to Crisis Classroom</h1>
              <HomePageText />
            </div>
          </div>
          <div className="col-md-6">
            {!AuthService.loggedIn() ? (
              <div>
                <div className="text-center">
                  <button
                    onClick={() => this.onClick(true)}
                    className="btn btn-lg btn-outline-dark loginBtn"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => this.onClick(false)}
                    className="btn btn-lg btn-outline-dark registerBtn"
                  >
                    Register
                  </button>
                </div>
                {login ? (
                  <Login history={this.props.history} />
                ) : (
                  <Registration history={this.props.history} />
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
