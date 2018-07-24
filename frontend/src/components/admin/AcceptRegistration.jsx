import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router';
import Button from '../button';
import Label from '../label';

// const STATUS = {
//   LOADING: 1,
//   SUCCESS: 2,
// };

class CheckRegistrationToken extends Component {
  constructor (props) {
    super (props);
    this.state = {
      token: '',
      user_name: '',
      first_name: '',
      sur_name: '',
      email: '',
      err: '',
      teacher: false,
      admin: false,
      msg: null,
    };
    if (this.state.token === '') {
      this.CheckToken ();
    }
  }
  handleChange = e => {
    this.setState ({
      [e.target.name]: e.target.checked,
    });
  };
  onSubmit = e => {
    e.preventDefault()
    const {teacher, admin, user_name} = this.state;
    axios
      .post (`${process.env.REACT_APP_DOMAIN}/accept-registration`, {
        teacher,
        admin,
        user_name,
      })
      .then (result => {
        if (result) {
          this.setState ({msg: result.data});
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
  };

  CheckToken = () => {
    const token = this.props.match.params.token;
    axios
      .get (`${process.env.REACT_APP_DOMAIN}/accept-registration/${token}`, '')
      .then (result => {
        if (result.data.rows) {
          const {
            token,
            first_name,
            sur_name,
            email,
            user_name,
          } = result.data.rows[0];
          this.setState ({token, user_name, first_name, sur_name, email});
        }
      })
      .catch (err => {
        if (err.response) {
          this.setState ({err: err.response.data.msg});
        } else {
          this.setState ({
            err: 'Ops! Sorry something happened on the server, please try again later',
          });
        }
      });
  };

  render () {
    const {first_name, user_name, sur_name, email, err, msg} = this.state;
    return (
      <div className="login-form">
        {msg
          ? <h5>{msg}</h5>
          : <div>
              <h5>{err}</h5>
              <h6>First Name: {first_name}</h6>
              <h6>Sure Name: {sur_name}</h6>
              <h6>Email: {email}</h6>
              <h6>User Name: {user_name}</h6>
              <form onSubmit={this.onSubmit}>
                <Label value="Teacher" />
                &nbsp; &nbsp;
                <input
                  name="teacher"
                  type="checkbox"
                  placeholder="teacher"
                  checked={this.state.teacher}
                  onChange={this.handleChange}
                />
                <br />
                <Label value="Admin" />
                &nbsp; &nbsp;
                <input
                  name="admin"
                  type="checkbox"
                  placeholder="admin"
                  checked={this.state.admin}
                  onChange={this.handleChange}
                />
                <Button className="btn btn-outline-dark" value="Submit" />
              </form>
            </div>}
      </div>
    );
  }
}

export default withRouter (CheckRegistrationToken);
