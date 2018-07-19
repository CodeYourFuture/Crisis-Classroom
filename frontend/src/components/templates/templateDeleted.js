import React from "react";
import { Link } from "react-router-dom";

const TemplateDeleted = () => {
  return (
    <div className="welecome">
      <div>
        <p>Your lesson has been deleted.</p>
        <Link to="/templates" className="btn btn-outline-success">
          Templates
        </Link>
      </div>
    </div>
  );
};

export default TemplateDeleted;