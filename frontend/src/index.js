import React from "react";
import ReactDOM from "react-dom";

import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes/Routes";
import "./index.css";

ReactDOM.render(
  <Router className="mainIndex">
    <Routes />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
