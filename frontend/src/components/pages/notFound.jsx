import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <h3>The page you are looking for does not exist</h3>
      &nbsp; &nbsp;
      <Link to="/" className="btn btn-outline-success">
        Go Back to Home Page
      </Link>
    </div>
  );
};

export default NotFound;
