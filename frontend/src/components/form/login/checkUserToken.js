import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router'

class CheckUserToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      user_name: "",
      err:""
    };
    if(this.state.token=== ""){
      this.CheckToken()
    }
  }

  CheckToken = () => {
    const token = this.props.match.params.token;
    axios
      .get(`${process.env.REACT_APP_DOMAIN}/reset-password/${token}`)
      .then(result => {
        if (result.data.rows) {
          const { token, user_name } = result.data.rows[0];
          this.setState({ token, user_name });
        }
      })
      .then(() => {
        const data = this.state;
        if (this.state.token) {
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

