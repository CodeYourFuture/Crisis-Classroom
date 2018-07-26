import React, { Component } from 'react';
import Button from '../../button';
import axios from 'axios';

class ConfirmRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      msg: null,
    };
  }

  onSubmit = () => {
    const {
      title,
      first_name,
      sur_name,
      user_name,
      email,
      password,
      confirmPassword,
      avatar,
      about_user,
      uuid,
    } = this.props.userData;

    axios
      .post(`${process.env.REACT_APP_DOMAIN}/register`, {
        title,
        first_name,
        sur_name,
        user_name,
        email,
        password,
        confirmPassword,
        avatar,
        about_user,
        uuid,
      })
      .then((result) => {
        if (result) {
          const { msg, err } = result.data;
          this.setState({ msg, err });
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
    const { msg, err } = this.state;
    return (
      <div className="lesson-form">
        {msg || err ? (
          <div>
            <p>
              {err}
              {msg}
            </p>
          </div>
        ) : (
          <div>
            <h3>
              Hi {state.title} {state.sur_name}, please check the below details
              and click 'Looks fine'.
            </h3>
            <div>
              {!state.avatar ? (
                <div>
                  <label className="btn btn-outline-dark">
                    {state.title === 'Mr' ? (
                      <div className="image-container">
                        <img
                          className="image"
                          width="100px"
                          src={require('../../../image/icons/man-avatar.jpg')}
                          alt="avatar"
                        />
                      </div>
                    ) : (
                      <div className="image-container">
                        <img
                          className="image"
                          width="100px"
                          src={require('../../../image/icons/women-avatar.jpg')}
                          alt="avatar"
                        />
                      </div>
                    )}
                    <input
                      style={{ display: 'none' }}
                      type="file"
                      name="avatar"
                      onChange={this.props.onChangeImageHandler}
                      accept="image/*"
                    />
                  </label>
                </div>
              ) : (
                <div className="image-container">
                  <img
                    className="image"
                    width="100px"
                    src={state.avatar}
                    alt="lesson Title "
                  />
                  <div className="middle">
                    <button
                      className="text"
                      name="avatar"
                      onClick={this.props.removeImageHandler}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
            <ul>
              <li>First name: {state.first_name}</li>
              <li>Last name: {state.sur_name}</li>
              <li>User name: {state.user_name}</li>
              <li>Email: {state.email}</li>
              <li>{state.about_user}</li>
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
        )}
      </div>
    );
  }
}

export default ConfirmRegistration;
