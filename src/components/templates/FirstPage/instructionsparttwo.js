import React from "react";
import { Col, Row } from "react-flexbox-grid/lib";
import "./style.css";

export default class Instructionsparttwo extends React.Component {
  render() {
    return (
      <div>
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
        <h1>It is ready to eat</h1>
      </div>
    );
  }
}
