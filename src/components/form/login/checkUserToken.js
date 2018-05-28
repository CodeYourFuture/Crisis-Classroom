import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class CheckUserToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resetPasswordToken: "",
      userName: "",
      expired: ""
    };
  }

  componentDidMount() {
    const token = window.location.pathname;
    axios
      .get(`http://localhost:8080${token}`, "crisisclassroom")
      .then(result => {
        if (result.data.rows) {
          const { resetPasswordToken, userName } = result.data.rows[0];
          this.setState({ resetPasswordToken, userName });
        }
        if (
          result.data === "Sorry this link is expired" ||
          result.data === "Sorry this link is Wrong"
        ) {
          this.setState({ expired: result.data });
        }
      })
      .then(() => {
        const data = this.state;
        if (this.state.resetPasswordToken) {
          this.props.history.push({
            pathname: "/reset-password",
            state: { data }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { expired } = this.state;
    return (
      <div>
        <div className="login-form">
          <p>{expired} please send an email agane</p>
          <Link to="/forgot-password">Resend email</Link>
        </div>
      </div>
    );
  }
}

export default CheckUserToken;
