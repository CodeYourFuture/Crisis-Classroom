import React, { Component } from "react";
// import SubscribeForm from "./form/subscribe/index";
import AboutCrisisClassroom from "./text/AboutCrisisClassroom";
// import "../../App.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer sub-footer header-1">
        <footer className="container page-footer font-small blue pt-4 mt-4">
            <AboutCrisisClassroom />
            {/* <SubscribeForm /> */}
          <div className="footer-copyright py-3 text-center">
            © 2018 Copyright:
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
