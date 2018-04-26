import React from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "./style.css";

const Welecome = () => {
  return (
    <div className="welecome">
      <div>
        <h2>
          Hello <strong>{Cookies.get("userName")}</strong> welecome to Crisis
          Classroom
        </h2>
        <p>
          Members area for those who have completed their training. In here you
          can connect with other volunteers from all around the world, share
          ideas and resources, offer & receive support, find out about
          volunteering opportunities and plan your own amazing projects, trips
          and classes.
        </p>
        <Link to="/" className="btn btn-outline-info">
          Go to Home pag
        </Link>
        <button className="btn btn-light">or</button>
        <Link to="/templates" className="btn btn-outline-success">
          Templates
        </Link>
      </div>
    </div>
  );
};

export default Welecome;
