import React from "react";

export default class SubscribeForm extends React.Component {
  render() {
    return (
      <div id="mailer" >
        <form action="/subForm" method="post" id="subForm">
          <input
            id="fieldName"
            class="form-control"
            name="cm-name"
            type="text"
            placeholder="Full name..."
          />
          <input
            id="fieldEmail"
            class="form-control"
            name="cm-urdtkir-urdtkir"
            type="email"
            placeholder="Email address..."
            required=""
          />
          <button type="submit" className="btn btn-default">
            GO!
          </button>
        </form>
      </div>
    );
  }
}
