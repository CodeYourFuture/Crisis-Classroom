import React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import AuthService from '../../Auth/AuthService';

class SelectUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      isAdmin: null,
      err: '',
      msg: '',
    };
  }

  UNSAFE_componentWillMount() {
    const url = this.props.match.url;
    const id = this.props.match.params.id;
    const token = AuthService.getToken();
    const decoded = decode(token);
    const userName = decoded.userName;
    axios
      .post(`http://localhost:8080${url}`, { userName, id })
      .then((result) => {
        if (result) {
          const user = result.data;
          this.setState({ user });
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
    const users = this.state.user;
    return (
      <div>
        {users.map((user, i) => {
          const {
            id,
            firstName,
            surName,
            userName,
            email,
            teacher,
            admin,
          } = user;
          console.log(user);
          return (
            <div key={i} className="login-form">
              <h5>First Name: {firstName}</h5>
              <h5>Sur Name: {surName}</h5>
              <h5>User Name: {userName}</h5>
              <h5>Email: {email}</h5>
              <h5>{teacher ? 'User is a teacher' : 'User is not a teacher'}</h5>
              <h5>{admin ? 'User is a admin' : 'user is not a admin'}</h5>
              <Link to={`users-info/${id}`} className="btn btn-outline-dark">
                Edit
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(SelectUser);
