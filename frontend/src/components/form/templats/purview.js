import React from "react";
import Context from "./context";
import Button from "../../button";
import { Grid, Row, Col } from "react-flexbox-grid/lib";
import axios from "axios";

export default class preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      err: ""
    };
  }

  CreatHandler = lessonData => {
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/creat-lessons`, lessonData)
      .then(result => {
        if (result) {
          const { msg, err } = result.data;
          this.setState({ msg, err });
        }
      })
      .catch(err => {
        this.setState({ err });
      });
  };

  EditHandler = lessonData => {
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/edit-lessons`, lessonData)
      .then(result => {
        if (result) {
          const { msg, err } = result.data;
          this.setState({ msg, err });
        }
      })
      .catch(err => {
        this.setState({ err });
      });
  };

  render() {
    const { err, msg } = this.state;
    return (
      <div>
        {err || msg ? (
          <h5 className="error">
            {err}
            {msg}
          </h5>
        ) : (
          <div>
            <h2 className="Preview-h2">Preview</h2>
            <Context.Consumer>
              {context => {
                return (
                  <Grid fluid className="grid-container">
                    <Row className="mian-row">
                      <Col className="box" lg={3} {...this.props}>
                        <div>
                          <div className="preview-title-items">
                            <h2>{context.lesson_title}</h2>
                            <img
                              className="preview-title-image"
                              src={context.lesson_title_image}
                              alt="lesson_title"
                            />
                          </div>
                          <div className="preview-items">
                            <h6>{context.time_to_prepare}</h6>
                            <img
                              className="preview-image"
                              width="50px"
                              src={context.time_to_prepare_image}
                              alt="ingredient"
                            />
                          </div>
                          <div className="preview-items">
                            <h6>{context.number_of_people}</h6>
                            <img
                              className="preview-image"
                              width="50px"
                              src={context.number_of_people_image}
                              alt="ingredient"
                            />
                          </div>
                        </div>
                        <hr className="preview-hr" />
                        <h4>Tools</h4>
                        {context.tools.map((tool, i) => (
                          <div className="preview-items" key={i}>
                            <h6>{tool.tool_name}</h6>
                            <img
                              className="preview-image"
                              width="50px"
                              src={tool.tool_image}
                              alt="tool"
                            />
                          </div>
                        ))}
                      </Col>
                      <Col className="box" lg={3} {...this.props}>
                        <h4>Ingredients</h4>
                        {context.ingredients.map((ingredient, i) => (
                          <div className="preview-items" key={i}>
                            <h6>{ingredient.ingredient_name}</h6>
                            <img
                              className="preview-image"
                              width="50px"
                              src={ingredient.ingredient_image}
                              alt="ingredient"
                            />
                          </div>
                        ))}
                      </Col>
                      <Col className="box" lg={3} {...this.props}>
                        <h4>Instructions</h4>
                        {context.instructions.map((instruction, i) => {
                          return (
                            <div className="preview-items" key={i}>
                              <h6>{instruction.instruction_name}</h6>
                              <img
                                className="preview-image"
                                width="50px"
                                src={instruction.instruction_image}
                                alt="instruction"
                              />
                            </div>
                          );
                        })}
                      </Col>
                      <Col className="box" lg={3} {...this.props} />
                    </Row>
                  </Grid>
                );
              }}
            </Context.Consumer>
            <Context.Consumer>
              {context => {
                const {
                  lesson_title,
                  lesson_title_image,
                  time_to_prepare,
                  time_to_prepare_image,
                  number_of_people,
                  number_of_people_image,
                  tools,
                  ingredients,
                  instructions,
                  previousFormHandler
                } = context;
                const lesson_id = this.props.id;
                return (
                  <div style={{ display: "flex" }}>
                    <Button
                      className="btn btn-outline-dark "
                      value="previous"
                      onClick={previousFormHandler}
                    />
                    &nbsp;
                    {lesson_id ? (
                      <div style={{ display: "flex" }}>
                        <Button
                          className="btn btn-outline-dark "
                          value="Edit"
                          onClick={() =>
                            this.EditHandler({
                              lesson_id,
                              lesson_title,
                              lesson_title_image,
                              time_to_prepare,
                              time_to_prepare_image,
                              number_of_people,
                              number_of_people_image,
                              tools,
                              ingredients,
                              instructions
                            })
                          }
                        />
                        &nbsp;
                        <Button
                          className="btn btn-outline-dark "
                          value="Create New One"
                          onClick={() =>
                            this.CreatHandler({
                              lesson_title,
                              lesson_title_image,
                              time_to_prepare,
                              time_to_prepare_image,
                              number_of_people,
                              number_of_people_image,
                              tools,
                              ingredients,
                              instructions
                            })
                          }
                        />
                      </div>
                    ) : (
                      <Button
                        className="btn btn-outline-dark "
                        value="Create Template"
                        onClick={() =>
                          this.CreatHandler({
                            lesson_title,
                            lesson_title_image,
                            time_to_prepare,
                            time_to_prepare_image,
                            number_of_people,
                            number_of_people_image,
                            tools,
                            ingredients,
                            instructions
                          })
                        }
                      />
                    )}
                  </div>
                );
              }}
            </Context.Consumer>
          </div>
        )}
      </div>
    );
  }
}
