import React from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import {Link} from 'react-router-dom';
import AuthService from '../../Auth/AuthService';

class UserInfo extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      isAdmin: null,
      err: '',
      msg: '',
    };
  }
  UNSAFE_componentWillMount () {
    const token = AuthService.getToken ();
    const decoded = decode (token);
    const userName = decoded.userName;
    axios
      .post (`${process.env.REACT_APP_DOMAIN}/admin`, {userName})
      .then (result => {
        if (result) {
          const isAdmin = result.data;
          this.setState ({isAdmin});
        }
      })
      .catch (err => {
        if (err.msg) {
          this.setState ({err: err.msg});
        } else {
          this.setState ({
            err: 'Ops! Sorry something happened on the server, please try again later',
          });
        }
      });
  }
  render () {
    const {isAdmin, err, msg} = this.state;
    return (
      <div>
        <div className="login-form">
          {isAdmin
            ? <div>
                <Link to="/users-info" className="btn btn-outline-dark">
                  Users Info
                </Link>
              </div>
            : <h5> {err} {msg}</h5>}
        </div>
      </div>
    );
  }
}
export default UserInfo;
