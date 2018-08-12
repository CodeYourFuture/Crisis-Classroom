import React, { Component } from 'react';
import Form from './form';
import ConfirmRegistration from './confirmRegistration';
import axios from 'axios';


class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
      title:'',
      first_name: '',
      sur_name: '',
      user_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      about_user: '',
      uuid:'',
      formSubmitted: false,
      errors: [],
      checkuser_name: [],
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
        this.setState({error})
      });
  };

  removeImageHandler = () => {
    this.setState({ avatar: null });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    const { user_name } = this.state;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/check-user-name`, {
        user_name,
      })
      .then((res) => {
        this.setState({ checkuser_name: res.data.rows[0].user_name });
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
      <div>
      <div className="registration">
        <div className="signin col-">
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
      </div>
      </div>

    );
  }
}

export default Registration;
