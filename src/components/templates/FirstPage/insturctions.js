import React from "react";
import { Col, Row } from "react-flexbox-grid/lib";
import "./style.css";

export default class Instructions extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.instruction}</h2>
        <hr className="hr" />
        {this.props.instructions.map((e, i) => {
          return (
            <div>
              <Row key={i} className="tools">
                <Col>
                  <h5>{e.instructionsName}</h5>
                </Col>
                <Col className="colSymbole" />
                <Col className="colSymbole">
                  <img
                    className="Symbole"
                    src={require(`../../../image/instructions/${
                      e.instructionsSymbol
                    }`)}
                    alt={e.instructionsName}
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
