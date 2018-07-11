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
      firstName: '',
      surName: '',
      teacher: 0,
      userName: '',
      avatar: null,
      err: '',
      msg: '',
      aboutUser: '',
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.checked,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { teacher, admin, userName } = this.state;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/accept-registration`, {
        teacher,
        admin,
        userName,
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
    const userName = decoded.userName;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}${url}`, { userName, id })
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
      teacher,
      admin,
      err,
      msg,
      avatar,
      aboutUser
    } = this.state;
    return (
      <div>
        <div className="login-form">
          <h5>{msg}</h5>
          <h5>{err}</h5>
          <div className="user-avatar">
            {!avatar ? (
              <div>
                {title === 'Mr' ? (
                  <img
                    className="image"
                    src={require('../../image/icons/man-avatar.jpg')}
                    alt="avatar"
                  />
                ) : (
                  <img
                    className="image"
                    src={require('../../image/icons/women-avatar.jpg')}
                    alt="avatar"
                  />
                )}
              </div>
            ) : (
              <img className="image" src={avatar} alt="avatar" />
            )}
          </div>
          <h5>First Name: {firstName}</h5>
          <h5>Sur Name: {surName}</h5>
          <h5>User Name: {userName}</h5>
          <h5>Email: {email}</h5>
          <h5>{aboutUser}</h5>
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
