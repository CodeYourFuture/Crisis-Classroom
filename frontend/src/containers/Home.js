import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import HomePageText from '../components/pages/Home';
import CrisisLogo from '../image/icons/crisis-logo.svg';
import Login from '../components/form/login/form';
import Registration from '../components/form/register/index';
import AuthService from '../Auth/AuthService';

class Home extends Component {
  constructor (props) {
    super (props);
    this.state = {
      login: true,
    };
  }
  onClick = e => {
    this.setState ({login: e});
  };
  render () {
    const {login} = this.state;
    return (
      <div className="home-page">
        <img
          className="logo-crisis-classroom text-center"
          alt="Logo crisis classroom"
          src={CrisisLogo}
        />
        <h1 className="welcome text-center">Welcome to Crisis Classroom</h1>
        <br />
        <br />

        <div className='row'>
        <div className="col-md-6">
        <HomePageText />

        </div>
        <div className="col-md-6">

        {!AuthService.loggedIn ()
          ? <div>
              <div>
                <button
                  onClick={() => this.onClick (true)}
                  className="btn btn-outline-dark"
                >
                  Login
                </button>
                <button
                  onClick={() => this.onClick (false)}
                  className="btn btn-outline-dark"
                >
                  Register
                </button>
              </div>
              {login ? <Login history={this.props.history}/> : <Registration history={this.props.history}/>}
            </div>
          : ''}
        </div>
        </div>
      </div>
    );
  }
}

export default Home;
