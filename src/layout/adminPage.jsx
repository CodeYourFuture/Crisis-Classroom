import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../Auth/AuthService";
import Header from "../containers/header";
import Footer from "../components/Footer";

const AdminPage = ({ component: Component, ...rest }) => {
  return ( 
    <Route
      {...rest}
      render={props => {
        return AuthService.AdminloggedIn() ? (
          <div>
            <Header {...props} />
            <Component {...props} />
            <Footer />
          </div>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

export default AdminPage;