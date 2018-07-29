import React from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import AuthService from '../../Auth/AuthService';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      admin: 0,
      email: '',
      first_name: '',
      sur_name: '',
      teacher: 0,
      user_name: '',
      avatar: null,
      about_user: '',
      err: '',
      msg: '',
    };
  }
  UNSAFE_componentWillMount() {
    const token = AuthService.getToken();
    const decoded = decode(token);
    const user_name = decoded.user_name;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/admin`, { user_name })
      .then((result) => {
        if (result) {
          const {
            title,
            first_name,
            sur_name,
            user_name,
            email,
            teacher,
            admin,
            avatar,
            about_user,
          } = result.data[0];
          this.setState({
            title,
            first_name,
            sur_name,
            user_name,
            email,
            teacher,
            admin,
            avatar,
            about_user,
          });
        }
      })
      .catch((err) => {
        if (err.msg) {
          this.setState({ err: err.msg });
        } else {
          this.setState({
            err:
              'Ops! Sorry something happened on the server, please try again later',
          });
        }
      });
  }
  render() {
    const {
      title,
      first_name,
      sur_name,
      user_name,
      email,
      admin,
      avatar,
      about_user,
      err,
      msg,
    } = this.state;
    return (
      <div>
        {admin ? (
          <div className="admin">
            <div className="admin-divs">
              <div className="admin-avatar">
                {!avatar ? (
                  <div>
                    {title === 'Mr' ? (
                      <img
                        className="admin-image"
                        src={require('../../image/icons/man-avatar.jpg')}
                        alt="avatar"
                      />
                    ) : (
                      <img
                        className="admin-image"
                        src={require('../../image/icons/women-avatar.jpg')}
                        alt="avatar"
                      />
                    )}
                  </div>
                ) : (
                  <img className="admin-image" src={avatar} alt="avatar" />
                )}
              </div>
              <h5>First Name: {first_name}</h5>
              <h5>Sur Name: {sur_name}</h5>
              <h5>User Name: {user_name}</h5>
              <h5>Email: {email}</h5>
              <h5>{about_user}</h5>
            </div>
            <div className="admin-divs">
            <h4>Chose one of falowing things you want to do..</h4>
              <Link to="/users-info">Users Informations...</Link>
            </div>
          </div>
        ) : (
          <h5 className="error">
            {err} {msg}
          </h5>
        )}
      </div>
    );
  }
}
export default UserInfo;
