import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router';

class CheckRegistrationToken extends Component {
  constructor (props) {
    super (props);
    this.state = {
      token: '',
      userName:'',
      firstName: '',
      surName: '',
      email: '',
      err: '',
    };
    if (this.state.token === '') {
      this.CheckToken ();
    }
  }
  
  CheckToken = () => {
    const token = this.props.match.params.token;
    axios
      .get (`http://localhost:8080/accept-registration/${token}`,"")
      .then (result => {
        if (result.data.rows) {
          const {
            token,
            firstName,
            surName,
            email,
            userName
          } = result.data.rows[0];
          this.setState ({token, userName, firstName, surName, email});
        }
      })
      .then (() => {
        const data = this.state;
        if (this.state.token) {
          this.props.history.push ({
            pathname: '/accept-registration',
            state: {data},
          });
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
    const {err} = this.state;
    return (
      <div>
        <div className="login-form">
          <p>{err}</p>
        </div>
      </div>
    );
  }
}

export default withRouter (CheckRegistrationToken);
