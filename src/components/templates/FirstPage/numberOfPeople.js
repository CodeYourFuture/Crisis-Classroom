import React from "react";
import { Col, Row } from "react-flexbox-grid/lib";
import "./style.css";

export default class NumberOfPeople extends React.Component {
  render() {
    return (
      <div>
        <Row className="numberOfPeople">
          <Col>
            <h3>{this.props.numberOfPeople}</h3>
          </Col>
          <Col>
            <img
              className="Symbole"
              src={require(`../../../image/symboles/${
                this.props.peopleSymbol
              }`)}
              alt={this.props.numberOfPeople}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
