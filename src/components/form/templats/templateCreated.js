import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const TemplateCreated = () => {
  return (
    <div className="welecome">
      <div>
        <h2>Thanks for your patience.</h2>
        <p>Your lesson has been created.</p>
        <Link to="/" className="btn btn-outline-info">
          Go to Home page
        </Link>
        <button className="btn btn-light">or</button>
        <Link to="/templates" className="btn btn-outline-success">
          Templates
        </Link>
      </div>
    </div>
  );
};

export default TemplateCreated;
