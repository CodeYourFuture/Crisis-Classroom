import React, { Component } from "react";
import { SocialIcon } from "react-social-icons";

class SocialMedia extends Component {
  render() {
    return (
      <div>
        <ul class="list-inline feast-social">
          <li>
            <SocialIcon
              url="https://www.facebook.com/CrisisClassroom/"
              network="facebook"
              color="#0197f8"
              style={{ height: 35, width: 35 }}
            />
          </li>
          <li>
            <SocialIcon
              url="https://www.instagram.com/crisisclassroom/"
              network="instagram"
              color="#0197f8"
              style={{ height: 35, width: 35 }}
            />
          </li>
          <li>
            <SocialIcon
              url="https://www.instagram.com/crisisclassroom/"
              network="twitter"
              color="#0197f8"
              style={{ height: 35, width: 35 }}
            />
          </li>
        </ul>
      </div>
    );
  }
}

export default SocialMedia;
