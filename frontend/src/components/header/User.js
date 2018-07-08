import React, { Component } from "react";
import { Link } from "react-router-dom";

class User extends Component {
  render() {
    return (
      <div>
        <Link to='/login'><button className="btn btn-primary">Login</button></Link>
        <Link to='/register'><button className="btn btn-primary">Register</button></Link>
        <Link to="/Uploads"> <button >Uploads </button> </Link>
      </div>
    );
  }
}

export default User;
