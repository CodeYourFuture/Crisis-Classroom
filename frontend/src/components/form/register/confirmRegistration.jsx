import React, { Component } from "react";
import axios from "axios";

class ConfirmRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      msg: null
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
      uuid
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
        uuid
      })
      .then(result => {
        if (result) {
          const { msg, err } = result.data;
          this.setState({ msg, err });
        }
      })
      .catch(err => {
        if (err.msg) {
          this.setState({ err: err.msg });
        } else {
          this.setState({
            err:
              "Ops! Sorry something happened on the server, please try again later"
          });
        }
      });
  };

  render() {
    const state = this.props.userData;
    const { msg, err } = this.state;
    return (
      <div>
        {msg || err ? (
          <div>
              <p className="error">{err}</p>
              <p>{msg}</p>
          </div>
        ) : (
          <div>
            <br/>
            <br/>
            <p>
            <strong> Cool ! {state.title} {state.sur_name}</strong>,
            <br/>
               Please check the below details
              and click <strong>Looks fine</strong> to get registration done.
            </p>
            <div>
              {!state.avatar ? (
                <div>
                  <label className="btn btn-outline-dark">
                    {state.title === "Mr" ? (
                      <div className="image-container">
                        <img
                          className="image"
                          width="100px"
                          src={require("../../../image/icons/man-avatar.jpg")}
                          alt="avatar"
                        />
                      </div>
                    ) : (
                      <div className="image-container">
                        <img
                          className="image"
                          width="100px"
                          src={require("../../../image/icons/women-avatar.jpg")}
                          alt="avatar"
                        />
                      </div>
                    )}
                    <input
                      style={{ display: "none" }}
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
            <div>
              <p>First name: {state.first_name}</p>
              <p>Last name: {state.sur_name}</p>
              <p>User name: {state.user_name}</p>
              <p>Email: {state.email}</p>
              <p>{state.about_user}</p>
            </div>
            <div>
              <button
                className="btn btn-info btnblock"
                onClick={this.props.onConfirmSubmit}
              >
                Back
              </button>
              <button className="btn btn-info btnblock" onClick={this.onSubmit}>
                Looks fine
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ConfirmRegistration;
