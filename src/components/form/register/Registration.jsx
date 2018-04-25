import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Button from "../../button";
// import AuthService from "../../../Auth/AuthService";

class Registration extends Component {

  render() {
      console.log(this.props.state)
      const state=this.props.state
    return (
      <div>
        <h1>{state.userName}</h1>
        <h1>{state.firstName}</h1>
        <h1>{state.surName}</h1>
        <h1>{state.email}</h1>
        <Button className="btn btn-outline-dark" value="Register" onClick={this.props.onSubmit}/>
      </div>
    );
  }
}

export default Registration;
