import React, { Component } from "react";
// import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "./Style.css";
import { Button } from "antd";

class userInfo extends Component {
  render() {
    return (
      <nav className="userInfo navbar navbar-dark bg-dark">
        <div>
          <div >
            {/* {Cookies.get("password") ? ( */}
              <div>
                <ul className="row">
                  <li className="nav-link">
                    <Link to="/templates">Templates</Link>
                  </li>
                  {/* <li className="nav-link">{Cookies.get("userName")}</li> */}
                  <li className="nav-link">
                    <Link to="/">
                      <Button
                        className="btn-link"
                        // onClick={() => Cookies.remove("password")}
                      >
                        log out
                      </Button>
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <li className="navbar-brand">
                <Link className="navbar-brand" to="/login">
                  <div>Login</div>
                </Link>
              </li>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default userInfo;

