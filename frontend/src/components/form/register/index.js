import React, { Component } from 'react';
import Form from './form';
import ConfirmRegistration from './confirmRegistration';
import axios from 'axios';

import './style.css';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
      title:'',
      firstName: '',
      surName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      aboutUser: '',
      formSubmitted: false,
      errors: [],
      checkUserName: [],
      checkEmail: [],
    };
  }

  onChangeImageHandler = (event) => {
    const data = new FormData();
    data.append('image', event.target.files[0]);
    const { name } = event.target;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/files`, data)
      .then((result) => {
        if (result) {
          const image = result.data.image;
          this.setState({
            ...this.state,
            [name]: image,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  removeImageHandler = () => {
    this.setState({ avatar: null });
  };

  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value,
    });

    const { userName } = this.state;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/check-user-name`, {
        userName,
      })
      .then((res) => {
        this.setState({ checkUserName: res.data.rows[0].userName });
      })
      .catch((error) => {
        this.setState({
          error,
        });
      });

    const { email } = this.state;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/check-email`, {
        email,
      })
      .then((res) => {
        this.setState({ checkEmail: res.data.rows[0].email });
      })
      .catch((error) => {
        this.setState({
          error,
        });
      });
  };

  onFormSubmit = () => {
    this.setState({
      formSubmitted: true,
    });
  };
  onConfirmSubmit = () => {
    this.setState({
      formSubmitted: false,
    });
  };

  render() {
    return (
      <div className="registration">
        <h3>Registration</h3>
        {!this.state.formSubmitted ? (
          <Form
            onFormSubmit={this.onFormSubmit}
            handleChange={this.handleChange}
            userData={this.state}
            history={this.props.history}
          />
        ) : (
          <ConfirmRegistration
            onConfirmSubmit={this.onConfirmSubmit}
            userData={this.state}
            onSubmit={this.onSubmit}
            history={this.props.history}
            onChangeImageHandler={this.onChangeImageHandler}
            removeImageHandler={this.removeImageHandler}
          />
        )}
      </div>
    );
  }
}

export default Registration;
