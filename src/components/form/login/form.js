import React from "react";
import { Link } from "react-router-dom";
import Input from "../../input";
import Button from "../../button";
import Label from "../../label";

export default class LoginForm extends React.Component {
  state = {
    username: "",
    password: ""
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
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={e => this.change(e)}
            />
          </div>
          <div class="form-group">
            <Label value="Password" />
            <Input
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.change(e)}
            />
          </div>
          <div className="form-group">
            <h3>Forgotten password?</h3>
            <div className="row">
              <Button
                className="btn btn-primary"
                onClick={e => this.onSubmit(e)}
                value="LogIn"
              />
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
