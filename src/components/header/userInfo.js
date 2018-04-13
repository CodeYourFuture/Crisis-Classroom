import React, { Component } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "./Style.css";
import Button from "../button";

class userInfo extends Component {
  render() {
    return (
      <div className="user-info">
        {Cookies.get("password") ? (
          <div className="user-info-items">
            <Link to="/templates">
              <Button className="btn btn-outline-success" value="Templates" />
            </Link>
            &nbsp;
            <Link to="/">
              <Button
                className="btn btn-outline-info"
                value={Cookies.get("userName")}
              />
            </Link>
            &nbsp;
            <Link to="/">
              <Button
                className="btn btn-outline-danger"
                onClick={() => Cookies.remove("password")}
                value="log out"
              />
            </Link>
          </div>
        ) : (
          <div className="row">
            <Link to="/login">
              <Button className="btn btn-outline-dark" value="Login" />
            </Link>
            &nbsp;
            <Link to="/register">
              <Button className="btn btn-outline-dark" value="Register" />
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default userInfo;
