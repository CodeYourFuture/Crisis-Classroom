import React from "react";
import { Col, Row } from "react-flexbox-grid/lib";
import "./style.css";

export default class TimeToPrepair extends React.Component {
  render() {
    return (
      <div>
        <Row className="timeToPrepair">
          <Col>
            <h3>{this.props.timeToPrepair}</h3>
          </Col>
          <Col>
            <img
              className="Symbole"
              src={require(`../../../image/symboles/${
                this.props.timeToPrepairClock
              }`)}
              alt={this.props.timeToPrepair}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
