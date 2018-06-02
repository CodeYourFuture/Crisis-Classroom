import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router'

class CheckUserToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resetPasswordToken: "",
      userName: "",
      expired: ""
    };
    if(this.state.resetPasswordToken=== ""){
      this.CheckToken()
    }
  }

  CheckToken = () => {
    const token = this.props.match.params.token;
    axios
      .get(`http://localhost:8080/reset-password/${token}`, "crisisclassroom")
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
  };

  render() {
    const { expired } = this.state;
    return (
      <div>
        <div className="login-form">
          <p>{expired}.</p>
          <Link to="/forgot-password">Resend email</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(CheckUserToken)

