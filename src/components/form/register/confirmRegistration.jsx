import React, { Component } from 'react';
import Button from '../../button';
import axios from 'axios';

class ConfirmRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: '',
    };
  }

  onSubmit = () => {
    const {
      firstName,
      surName,
      userName,
      email,
      password,
      confirmPassword,
    } = this.props.userData;

    axios
      .post('http://localhost:8080/register', {
        firstName,
        surName,
        userName,
        email,
        password,
        confirmPassword,
      })
      .then((result) => {
        if (result) {
          this.props.history.replace('/registration-done');
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

  render() {
    const state = this.props.userData;
    return (
      <div className="lesson-form">
        <p>{this.state.err}</p>
        <h3>
          Hi {state.firstName}, please check the below details and click 'Looks
          fine'.
        </h3>
        <ul>
          <li>First name: {state.firstName}</li>
          <li>Last name: {state.surName}</li>
          <li>User name: {state.userName}</li>
          <li>Email: {state.email}</li>
        </ul>
        <div className="row container">
          <Button
            className="btn btn-outline-dark"
            value="Back"
            onClick={this.props.onConfirmSubmit}
          />
          &nbsp; &nbsp;
          <Button
            className="btn btn-outline-dark"
            value="Looks fine"
            onClick={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

export default ConfirmRegistration;
