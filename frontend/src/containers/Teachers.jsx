import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import TeachersList from "../components/teachers/teachersList.jsx";
import Teacher from "../components/teachers/teacher.jsx";

export default class Teachers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
      err: false,
      msg: false
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_DOMAIN}/teachers`)
      .then(res => res.json())
      .then(result => {
        if (result.msg) {
          this.setState({ msg: result.msg });
        } else if (result) {
          this.setState({ teachers: result });
        } else
          this.setState({
            err:
              "Sorry something happened on the server, please try again later."
          });
      })
      .catch(error => {
        if (error) {
          this.setState({
            err:
              "Sorry something happened on the server, please try again later."
          });
        }
      });
  }
  render() {
    const { match } = this.props;
    const { err, msg } = this.state;
    return (
      <div>
        {msg || err ? (
          <h5 className="error">
            {msg}
            {err}
          </h5>
        ) : (
          <Switch>
            <Route
              exact
              path="/teachers"
              render={props => (
                <TeachersList {...props} teachers={this.state.teachers} />
              )}
            />
            <Route
              exact
              path="/teachers/:id"
              render={props => (
                <Teacher {...props} teachers={this.state.teachers} />
              )}
            />
            <Redirect to={match.path} />
          </Switch>
        )}
      </div>
    );
  }
}
