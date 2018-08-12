import React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import decode from 'jwt-decode';
// import {Link} from 'react-router-dom';
import AuthService from '../../Auth/AuthService';
import Button from '../button';
import Label from '../label';

class SelectUser extends React.Component {
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
      err: '',
      msg: '',
      about_user: '',
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.checked,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { teacher, admin, user_name } = this.state;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/accept-registration`, {
        teacher,
        admin,
        user_name,
      })
      .then((result) => {
        if (result) {
          this.setState({ msg: result.data });
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
  };
  UNSAFE_componentWillMount() {
    const url = this.props.match.url;
    const id = this.props.match.params.id;
    const token = AuthService.getToken();
    const decoded = decode(token);
    const user_name = decoded.user_name;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}${url}`, { user_name, id })
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
      teacher,
      admin,
      err,
      msg,
      avatar,
      about_user,
    } = this.state;
    return (
      <div className="admin">
        {msg && <p>{msg}</p>}
        {err &&<p className="error">{err}</p>}
        <div className="admin-avatar">
          {!avatar ? (
            <div>
              {title === 'Mr' ? (
                <img
                  className="admin-avatar"
                  src={require('../../image/icons/man-avatar.jpg')}
                  alt="avatar"
                />
              ) : (
                <img
                  className="admin-avatar"
                  src={require('../../image/icons/women-avatar.jpg')}
                  alt="avatar"
                />
              )}
            </div>
          ) : (
            <img className="admin-avatar" src={avatar} alt="avatar" />
          )}
        </div>
        <div className="admin-user-info">
          <p>First Name: {first_name}</p>
          <p>Sur Name: {sur_name}</p>
          <p>User Name: {user_name}</p>
          <p>Email: {email}</p>
          <p>{about_user}</p>
            <form onSubmit={this.onSubmit}>
              <Label value="Teacher" />
              &nbsp; &nbsp;
              <input
                name="teacher"
                type="checkbox"
                placeholder="teacher"
                checked={teacher}
                onChange={this.handleChange}
              />
              <br />
              <Label value="Admin" />
              &nbsp; &nbsp;
              <input
                name="admin"
                type="checkbox"
                placeholder="admin"
                checked={admin}
                onChange={this.handleChange}
              />
              <Button className="btn btn-outline-dark" value="Submit" />
            </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SelectUser);
