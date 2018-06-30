import React from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import AuthService from '../../Auth/AuthService';

class UserInfo extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      users: [],
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
      .post ('http://localhost:8080/users-info', {userName})
      .then (result => {
        const users = result.data;
        if (result) {
          this.setState ({users});
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
    const users = this.state.users;
    return (
      <div>
        {users.map ((user, i) => {
          const {firstName, surName, userName, email, teacher, admin} = user;
          return (
            <div key={i} className="login-form">
              <h5>First Name: {firstName}</h5>
              <h5>Sur Name: {surName}</h5>
              <h5>User Name: {userName}</h5>
              <h5>Email: {email}</h5>
              <h5>{teacher}</h5>
              <h5>{admin}</h5>
            </div>
          );
        })}
      </div>
    );
  }
}
export default UserInfo;
