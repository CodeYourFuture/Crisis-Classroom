import React, { Component } from "react";
import { SocialIcon } from "react-social-icons";
import "./Style.css";

class SocialMedia extends Component {
  render() {
    return (
      <div className="list-inline feast-social socialm">
        <SocialIcon
          url="https://www.facebook.com/CrisisClassroom/"
          network="facebook"
          color="#0197f8"
          style={{ height: 35, width: 35 }}
        />

        <SocialIcon
          url="https://www.instagram.com/crisisclassroom/"
          network="instagram"
          color="#0197f8"
          style={{ height: 35, width: 35 }}
        />

        <SocialIcon
          url="https://www.instagram.com/crisisclassroom/"
          network="twitter"
          color="#0197f8"
          style={{ height: 35, width: 35 }}
        />
      </div>
    );
  }
}

export default SocialMedia;
