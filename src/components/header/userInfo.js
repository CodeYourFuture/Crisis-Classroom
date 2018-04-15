import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Style.css";
import Button from "../button";
import AuthService from "../../Auth/AuthService";
const Auth = new AuthService();

class userInfo extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  onLogOut = ()=>{
    Auth.logout();
    this.props.history.replace("/");
  }
  onClick = () => {
    alert("Hop to see you soon");
  };
  render() {
    
    return (
      <div className="user-info">
        <div className="user-info-items">
          <Link to="/templates" className="btn btn-outline-success">
            Templates
          </Link>
          <Button className="btn btn-outline-success" value="Log Out" onClick={this.onLogOut}/>
        </div>
      </div>
    );
  }
}

export default userInfo;
