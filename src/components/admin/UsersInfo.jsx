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
      <div>
        {users.map((user, i) => {
          const { id, firstName, surName} = user;
          console.log(user);
          return (
            <div key={i} className="login-form">
              <h5> {firstName} {surName}</h5>
              <Link to={`users-info/${id}`} className="btn btn-outline-dark">Edit</Link>
            </div>
          );
        })}
      </div>
    );
  }
}
export default UserInfo;
