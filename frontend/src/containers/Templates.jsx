import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import TemplatesList from '../components/templates/TemplatesList';
import Template from '../components/templates/index';

export default class Templates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_DOMAIN}/lessons`)
      .then((res) => res.json())
      .then((lessons) => {
        if (lessons) {
          this.setState({ lessons });
        }
      })
      .catch((error) => {
        return error;
      });
  }
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route
          exact
          path="/templates"
          render={(props) => (
            <TemplatesList {...props} lessons={this.state.lessons} />
          )}
        />
        <Route
          exact
          path="/templates/:id"
          render={(props) => (
            <Template {...props} lessons={this.state.lessons} />
          )}
        />
        <Redirect to={match.path} />
      </Switch>
    );
  }
}
