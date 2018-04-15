import React from "react";
import ReactDOM from "react-dom";

import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes/Routes";
import "./index.css";

ReactDOM.render(
  <Router>
    <div className="container">
      <div className="mainIndex">
        <Routes />
      </div>
    </div>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
