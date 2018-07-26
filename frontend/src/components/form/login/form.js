import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../input';
import Button from '../../button';
import Label from '../../label';
import AuthService from '../../../Auth/AuthService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: '',
      user_name: '',
      password: '',
    };
    this.Auth = AuthService;
  }

  UNSAFE_componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace('/');
  }
  onSubmit = (e) => {
    e.preventDefault();

    this.Auth
      .login(this.state.user_name, this.state.password)
      .then((res) => {
        if (this.Auth.loggedIn()) this.props.history.replace('/');
      })
      .catch((err) => {
        if (err.msg) {
          this.setState({ err: err.msg });
        } else {
          this.setState({
            err:
              'Ops! Sorry something happened on the server, please try again later',
          });
        }
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <h3>Login</h3>
        <div className="login-form">
          <p>{this.state.err}</p>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <Label value="user_name *" />
              <Input
                className="form-control"
                name="user_name"
                type="text"
                placeholder="user_name"
                value={this.state.user_name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <Label value="Password *" />
              <Input
                className="form-control"
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <Link to="/forgot-password">Forgotten password?</Link>
              <div className="row">
                &nbsp; &nbsp;
                <Button className="btn btn-outline-dark" value="Login" />
                &nbsp;
                <Link to="/register" className="btn btn-outline-dark">
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
