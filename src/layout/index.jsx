import React from "react";
import { Route } from "react-router-dom";

import Header from "../components/header/Index";
import Footer from "../components/Footer";

const DefaultLayout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <div className="container">
        <div className="mainIndex">
          <Header {...matchProps} />
          <Component {...matchProps} />
          <Footer />
        </div>
      </div>
    )}
  />
);

export default DefaultLayout;
