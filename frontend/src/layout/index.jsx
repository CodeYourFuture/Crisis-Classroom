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
          <Component {...props} />
          <Footer />
        </div>
      );
    }}
  />
);

export default DefaultLayout;
