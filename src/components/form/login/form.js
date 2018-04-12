import React from "react";
import { Link } from "react-router-dom";
import Input from "../../input";
import Button from "../../button";
import Label from "../../label";
import axios from "axios";

export default class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: ""
    };
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    // console.log(e.target.value)
  };

  onSubmit = e => {
    e.preventDefault();
    const { userName, password } = this.state;
    console.log(userName, password);
    axios
      .post("http://localhost:8001/api/login", { userName, password })
      .then(result => {
        console.log(result.data.status);
        if (result.data.status) {
          document.cookie = `userName=${this.state.userName}`;
          document.cookie = ` password=${this.state.password}`;
        } else alert("User name and Password is wrong");
      });
  };

  render() {
    return (
      <div className="lesson-form">
        <h1>LogIn</h1>
        <form>
          <div className="form-group">
            <Label value="User Name" />
            <Input
              className="form-control"
              name="userName"
              type="text"
              placeholder="UserName"
              value={this.state.userName}
              onChange={e => this.onChange(e)}
            />
          </div>
          <div className="form-group">
            <Label value="Password" />
            <Input
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.onChange(e)}
            />
          </div>
          <div className="form-group">
            <h3>Forgotten password?</h3>
            <div className="row">
              <Link to="/welecome">
                <Button
                  className="btn btn-primary"
                  onClick={e => this.onSubmit(e)}
                  value="LogIn"
                />
              </Link>
              <h6 className="btn">OR</h6>
              <Link to="/register">
                <Button className="btn btn-primary" value="Register" />
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
