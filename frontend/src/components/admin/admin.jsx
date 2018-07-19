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
      firstName: '',
      surName: '',
      teacher: 0,
      userName: '',
      avatar: null,
      aboutUser: '',
      err: '',
      msg: '',
    };
  }
  UNSAFE_componentWillMount() {
    const token = AuthService.getToken();
    const decoded = decode(token);
    const userName = decoded.userName;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/admin`, { userName })
      .then((result) => {
        if (result) {
          const {
            title,
            firstName,
            surName,
            userName,
            email,
            teacher,
            admin,
            avatar,
            aboutUser,
          } = result.data[0];
          this.setState({
            title,
            firstName,
            surName,
            userName,
            email,
            teacher,
            admin,
            avatar,
            aboutUser,
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
      firstName,
      surName,
      userName,
      email,
      admin,
      avatar,
      aboutUser,
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
              <h5>First Name: {firstName}</h5>
              <h5>Sur Name: {surName}</h5>
              <h5>User Name: {userName}</h5>
              <h5>Email: {email}</h5>
              <h5>{aboutUser}</h5>
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
