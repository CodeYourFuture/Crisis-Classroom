import React, { Component } from "react";
import HomePageText from "../components/pages/Home";
import CrisisLogo from "../image/icons/crisis-logo.svg";
import Enrollment from "../components/pages/Enrollment";
import AuthService from "../Auth/AuthService";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    };
  }

  render() {
    return (
      <div className="home-container">
        <div className="home-itmes">
          <img
            className="logo-crisis-classroom text-center"
            alt="Logo crisis classroom"
            src={CrisisLogo}
          />
          <h1 className="welcome text-center">Welcome to Crisis Classroom</h1>
          <div className="home-page-text">
            <HomePageText />
          </div>
        </div>
        <div>
          {!AuthService.loggedIn() && (
            <div>
              <button
                type="button"
                className="btn btn-info btn-block"
                data-toggle="modal"
                data-target="#myModal"
              >
                Get start with Crisis Classroom
              </button>
              <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-body">
                      <Enrollment history={this.props.history} />
                    </div>
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
