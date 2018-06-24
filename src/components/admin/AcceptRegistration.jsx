import React, { Component } from 'react';

export default class AcceptRegistration extends Component {
  render() {
    const { data } = this.props.location.state;
    console.log(data);
    return (
      <div className="login-form">
        <h6>First Name: {data.firstName}</h6>
        <h6>Sure Name: {data.surName}</h6>
        <h6>{data.email}</h6>
        <h6>{data.userName}</h6>
      </div>
    );
  }
}
