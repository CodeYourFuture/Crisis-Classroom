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
      err:""
    };
    if(this.state.resetPasswordToken=== ""){
      this.CheckToken()
    }
  }

  CheckToken = () => {
    const token = this.props.match.params.token;
    axios
      .get(`http://localhost:8080/reset-password/${token}`)
      .then(result => {
        if (result.data.rows) {
          const { resetPasswordToken, userName } = result.data.rows[0];
          this.setState({ resetPasswordToken, userName });
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
        if(err.response){
          this.setState({err: err.response.data.msg})
        }else{
          this.setState({err: "Ops! Sorry something happened on the server, please try again later"})
        }
      });
  };

  render() {
    const { err } = this.state;
    return (
      <div>
        <div className="login-form">
          <p>{err}</p>
          <Link to="/forgot-password">Resend email</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(CheckUserToken)

