import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import TemplatesList from "../components/templates/TemplatesList";
import Template from "../components/templates/index";

export default class Templates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
      err: false,
      msg: false
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_DOMAIN}/lessons`)
      .then(res => res.json())
      .then(result => {
        if (result.msg) {
          this.setState({ msg: result.msg });
        } else if (result) {
          this.setState({ lessons: result });
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
              path="/templates"
              render={props => (
                <TemplatesList {...props} lessons={this.state.lessons} />
              )}
            />
            <Route
              exact
              path="/templates/:id"
              render={props => (
                <Template {...props} lessons={this.state.lessons} />
              )}
            />
            <Redirect to={match.path} />
          </Switch>
        )}
      </div>
    );
  }
}
