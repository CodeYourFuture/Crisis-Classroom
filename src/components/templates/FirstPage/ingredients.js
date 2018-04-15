import React from "react";
import { Col, Row } from "react-flexbox-grid/lib";
import "./style.css";

export default class Ingredients extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.ingredient}</h2>
        <hr className="hr" />
        {this.props.ingredients.map((e, i) => {
          return (
            <div>
              <Row key={i} className="tools">
                <Col>
                  <h5>{e.ingridientsName}</h5>
                </Col>
                <Col className="colSymbole" />
                <Col className="colSymbole">
                  <img
                    className="Symbole"
                    src={require(`../../../image/ingredients/${
                      e.ingridientsSymbol
                    }`)}
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
