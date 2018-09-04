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
        return AuthService.loggedIn() ? (
          <div>
            {AuthService.isAdmin() ? (
              <div>
                <Header {...props} />
                <Component {...props} />
                <Footer />
              </div>
            ) : (
              <div>
                <Header {...props} />
                <h1 className="error">You don't have permission to access to this page.</h1>
                <Footer />
              </div>
            )}
          </div>
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

export default AdminPage;
