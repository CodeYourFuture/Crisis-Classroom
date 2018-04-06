import React from "react";
import { Col, Row } from "react-flexbox-grid/lib";
import "./style.css";

export default class Tools extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.toolsItem}</h2>
        <hr className="hr" />
        {this.props.tools.map((e, i) => {
          return (
            <div>
              <Row key={i} className="tools">
                <Col>
                  <h5>{e.toolName}</h5>
                </Col>
                <Col className="colSymbole" />
                <Col className="colSymbole">
                  <img
                    className="Symbole"
                    src={require(`../../../image/tools/${e.toolsSymbole}`)}
                    alt={e.toolName}
                  />
                </Col>
              </Row>
            </div>
          );
        })}
      </div>
    );
  }
}
