import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import './Style.css';
import AuthService from '../../Auth/AuthService';
import Button from '../button';
import decode from 'jwt-decode';

export default class NavbarFeatures extends Component {
  constructor (props) {
    super (props);
    this.state = {
      userName: '',
      avatar: '',
      title: null,
    };
  }
  UNSAFE_componentWillMount () {
    const token = AuthService.getToken ();
    if (token) {
      const decoded = decode (token);
      const {userName, avatar, title} = decoded;
      this.setState ({userName, avatar, title});
    }
  }
  onLogOut = () => {
    AuthService.logout ();
    this.props.history.replace ('/');
  };

  render () {
    const {userName, avatar, title} = this.state;
    return (
      <Route>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            <div>Home</div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/training">
                  Training
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/templates" className="nav-link">
                  Templates
                </Link>
              </li>
              {AuthService.loggedIn ()
                ? <div>
                    <li className="nav-item user-info-items">
                      <Link to="/user-profile" className="nav-link">{userName}</Link >
                      <div className="nav-link">
                        <div className="user-avatar">
                          {!avatar
                            ? <div>
                                {title === 'Mr'
                                  ? <img
                                      className="nav-image"
                                      src={require ('../../image/icons/man-avatar.jpg')}
                                      alt="avatar"
                                    />
                                  : <img
                                      className="nav-image"
                                      src={require ('../../image/icons/women-avatar.jpg')}
                                      alt="avatar"
                                    />}
                              </div>
                            : <img
                                className="nav-image"
                                src={avatar}
                                alt="avatar"
                              />}
                        </div>
                      </div>
                      &nbsp;
                      <Button
                        className="log-out nav-link"
                        value="Log Out"
                        onClick={this.onLogOut}
                      />
                    </li>
                  </div>
                : ''
                  // <li className="nav-item user-info-items">
                  //   <Link to="/login" className="nav-link">
                  //     LogIn
                  //   </Link>
                  //   &nbsp;
                  //   <Link to="/register" className="nav-link">
                  //     Register
                  //   </Link>
                  // </li>
              }
            </ul>
            {/* <form className="form-inline my-2 my-lg-0 form">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form> */}
          </div>
        </nav>
      </Route>
    );
  }
}
