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
      userName: '',
      firstName: '',
      surName: '',
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
    const {teacher, admin, userName} = this.state;
    axios
      .post ('http://localhost:8080/accept-registration', {
        teacher,
        admin,
        userName,
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
      .get (`http://localhost:8080/accept-registration/${token}`, '')
      .then (result => {
        if (result.data.rows) {
          const {
            token,
            firstName,
            surName,
            email,
            userName,
          } = result.data.rows[0];
          this.setState ({token, userName, firstName, surName, email});
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
    const {firstName, userName, surName, email, err, msg} = this.state;
    return (
      <div className="login-form">
        {msg
          ? <h5>{msg}</h5>
          : <div>
              <h5>{err}</h5>
              <h6>First Name: {firstName}</h6>
              <h6>Sure Name: {surName}</h6>
              <h6>Email: {email}</h6>
              <h6>User Name: {userName}</h6>
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
