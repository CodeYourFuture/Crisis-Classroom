import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const TemplateEdited = () => {
  return (
    <div className="welecome">
      <div>
        <h2>Thanks for your patience.</h2>
        <p>Your lesson has been edited.</p>
        <Link to="/templates" className="btn btn-outline-success">
          Templates
        </Link>
      </div>
    </div>
  );
};

export default TemplateEdited;