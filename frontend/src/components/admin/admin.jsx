import React from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import AuthService from '../../Auth/AuthService';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: 0,
      email: '',
      firstName: '',
      surName: '',
      teacher: 0,
      userName: '',
      isAdmin: null,
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
            firstName,
            surName,
            userName,
            email,
            teacher,
            admin,
          } = result.data[0];
          this.setState({
            firstName,
            surName,
            userName,
            email,
            teacher,
            admin,
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
      firstName,
      surName,
      userName,
      email,
      admin,
      err,
      msg,
    } = this.state;
    return (
      <div>
        <div className="login-form">
          {admin ? (
            <div>
              <div>
                <h5>First Name: {firstName}</h5>
                <h5>Sur Name: {surName}</h5>
                <h5>User Name: {userName}</h5>
                <h5>Email: {email}</h5>
              </div>
              <div>
                <Link to="/users-info" className="btn btn-outline-dark">
                  Users Info
                </Link>
              </div>
            </div>
          ) : (
            <h5>
              {err} {msg}
            </h5>
          )}
        </div>
      </div>
    );
  }
}
export default UserInfo;
