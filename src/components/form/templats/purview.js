import React from "react";
import Context from "./context";
import Button from "../../button";
import { Grid, Row, Col } from "react-flexbox-grid/lib";
import axios from "axios";

export default class preview extends React.Component {

  CreatHandler = lessonData => {
    axios
      .post("http://localhost:8080/creat-lessons", lessonData)
      .then(result => {
        if (result) {
          this.props.history.replace("/template-created");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  EditHandler = lessonData => {
    axios
      .post("http://localhost:8080/edit-lessons", lessonData)
      .then(result => {
        if (result) {
          this.props.history.replace("/template-edited");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
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
                        <h2>{context.lessonTitle}</h2>
                        <img
                          className="preview-title-image"
                          src={context.lessonTitleImage}
                          alt="lessonTitle"
                        />
                      </div>
                      <div className="preview-items">
                        <h6>{context.timeToPrepare}</h6>
                        <img
                          className="preview-image"
                          width="50px"
                          src={context.timeToPrepareImage}
                          alt="ingredient"
                        />
                      </div>
                      <div className="preview-items">
                        <h6>{context.numberOfPeople}</h6>
                        <img
                          className="preview-image"
                          width="50px"
                          src={context.numberOfPeopleImage}
                          alt="ingredient"
                        />
                      </div>
                    </div>
                    <hr className="preview-hr" />
                    <h4>Tools</h4>
                    {context.tools.map((tool, i) => (
                      <div className="preview-items" key={i}>
                        <h6>{tool.toolName}</h6>
                        <img
                          className="preview-image"
                          width="50px"
                          src={tool.toolImage}
                          alt="tool"
                        />
                      </div>
                    ))}
                  </Col>
                  <Col className="box" lg={3} {...this.props}>
                    <h4>Ingredients</h4>
                    {context.ingredients.map((ingredient, i) => (
                      <div className="preview-items" key={i}>
                        <h6>{ingredient.ingredientName}</h6>
                        <img
                          className="preview-image"
                          width="50px"
                          src={ingredient.ingredientImage}
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
                          <h6>{instruction.instructionName}</h6>
                          <img
                            className="preview-image"
                            width="50px"
                            src={instruction.instructionImage}
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
              lessonTitle,
              lessonTitleImage,
              timeToPrepare,
              timeToPrepareImage,
              numberOfPeople,
              numberOfPeopleImage,
              tools,
              ingredients,
              instructions,
              previousFormHandler
            } = context;
            const lessonId = this.props.id;
            return (
              <div style={{ display: "flex" }}>
                <Button
                  className="btn btn-outline-dark "
                  value="previous"
                  onClick={previousFormHandler}
                />
                &nbsp;
                {lessonId ? (
                  <div style={{ display: "flex" }}>
                    <Button
                      className="btn btn-outline-dark "
                      value="Edit"
                      onClick={() =>
                        this.EditHandler({
                          lessonId,
                          lessonTitle,
                          lessonTitleImage,
                          timeToPrepare,
                          timeToPrepareImage,
                          numberOfPeople,
                          numberOfPeopleImage,
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
                          lessonTitle,
                          lessonTitleImage,
                          timeToPrepare,
                          timeToPrepareImage,
                          numberOfPeople,
                          numberOfPeopleImage,
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
                        lessonTitle,
                        lessonTitleImage,
                        timeToPrepare,
                        timeToPrepareImage,
                        numberOfPeople,
                        numberOfPeopleImage,
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
    );
  }
}
