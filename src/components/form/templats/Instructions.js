import React from "react";
// import Input from "../../input";
// import Label from "../../label";
// import Button from "../../button";
import Context from "./context";

export default class Instructions extends React.Component {
  render() {
    return (
      <div>
        <Context.Consumer>
        {({ tools }) => (
        tools.map(tool =>(
          <img
          className="image"
          width="100px"
          src={tool.image}
          alt="foo"
        />
        ))
      )}
        </Context.Consumer>
      </div>
    );
  }
}
