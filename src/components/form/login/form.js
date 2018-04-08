import React from "react";
import { Link } from "react-router-dom";
export default class LoginForm extends React.Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <div>
        <form>
          <input
            className="form-control"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={e => this.change(e)}
          />
          <br />
          <input
            className="form-control"
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={e => this.change(e)}
          />
          <br />
          <h3>Forgotten password?</h3>
          <br />
          <button className="btn btn-primary" onClick={e => this.onSubmit(e)}>
            LogIn
          </button>
          &nbsp;
          <Link to="/register">
            <button className="btn btn-primary">OR Register</button>
          </Link>
        </form>
      </div>
    );
  }
}
