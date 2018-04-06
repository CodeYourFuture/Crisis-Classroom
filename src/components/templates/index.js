import React from "react";

import FirstPage from "./FirstPage/index";
import FakeData from "../../data/Fakedb.json"

export default class TemplatIndex extends React.Component {
  render() {
    return (
      <div>
        <FirstPage data={FakeData}/>
      </div>
    );
  }
}
