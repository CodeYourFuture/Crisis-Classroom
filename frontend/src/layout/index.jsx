import React from "react";
import { Route } from "react-router-dom";

import Header from "../containers/header";
import Footer from "../components/Footer";

const DefaultLayout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <div>
          <Header {...props} />
          <div className="container">
            <Component {...props} />
          </div>
          <Footer />
        </div>
      );
    }}
  />
);

export default DefaultLayout;
