import React from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import AuthService from '../../Auth/AuthService';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      err: '',
      msg: '',
    };
  }
  UNSAFE_componentWillMount() {
    const token = AuthService.getToken();
    const decoded = decode(token);
    const userName = decoded.userName;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/users-info`, { userName })
      .then((result) => {
        const users = result.data;
        if (result) {
          this.setState({ users });
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
    const users = this.state.users;
    return (
      <div style={{"background-color": "#dadada"}}>
        <h3>Users</h3>
        {users.map((user, i) => {
          const { id, title, firstName, surName, avatar, aboutUser } = user;
          return (
            <div key={i}>
              <Link to={`users-info/${id}`} className="admin-users">
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
                <div>
                  <h6>
                    {title} {firstName} {surName}
                  </h6>
                  <h6>{aboutUser}</h6>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
export default UserInfo;
