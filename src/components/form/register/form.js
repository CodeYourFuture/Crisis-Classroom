import validator from "react-validation";
import React from "react";
import Input from "../../input";
import Button from "../../button";
import Label from "../../label";
// import { Link } from "react-router-dom";
import axios from "axios";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      surName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      passwordMach: null
    };
  }
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      firstName,
      surName,
      userName,
      email,
      password,
      confirmPassword
    } = this.state;
    // this.passVal(this.state.password);
    if (password === confirmPassword) {
      axios
        .post("http://localhost:8080/register", {
          firstName,
          surName,
          userName,
          email,
          password,
          confirmPassword
        })
        .then(result => {
          console.log(result);
          this.props.history.replace("/");
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({ passwordMach: "Password does not mach" });
    }
  };

  render() {
    return (
      <div className="lesson-form">
        <h1>Register</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <Label value="Full Name" />
            <div>
              <Input
                className="form-control"
                name="firstName"
                type="text"
                placeholder="First name"
                value={this.state.firstName}
                onChange={this.change}
              />
              <Input
                className="form-control"
                name="surName"
                type="text"
                placeholder="Last name"
                value={this.state.surName}
                onChange={this.change}
              />
            </div>
          </div>
          <div className="form-group">
            <Label value="User Name" />
            <Input
              className="form-control"
              name="userName"
              type="text"
              placeholder="UserName"
              value={this.state.userName}
              onChange={this.change}
            />
          </div>
          <div className="form-group">
            <Label value="Email" />
            <Input
              className="form-control"
              name="email"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.change}
              validations={[required, email]}
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
              onChange={this.change}
              validations={[required, password]}
            />
          </div>
          <div className="form-group">
            <Label value="Confirm Your Password" />
            <Input
              className="form-control"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Your Password"
              value={this.state.confirmPassword}
              onChange={this.change}
              validations={[required, password]}
            />
            <h6>{this.state.passwordMach}</h6>
          </div>
          <Button className="btn btn-outline-dark" value="Register" />
        </form>
      </div>
    );
  }
}

const required = value => {
  if (!value.toString().trim().length) {
    return "require";
  }
};

const email = value => {
  if (!validator.isEmail(value)) {
    return `${value} is not a valid email.`;
  }
};

// const lt = (value, props) => {
//   if (!value.toString().trim().length > props.maxLength) {
//     return (
//       <span className="error">
//         The value exceeded {props.maxLength} symbols.
//       </span>
//     );
//   }
// };

const password = (value, props, components) => {
  if (value !== components["confirm"][0].value) {
    return <span className="error">Passwords are not equal.</span>;
  }
};
