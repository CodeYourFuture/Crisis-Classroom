import React from "react";
import Context from "./context";
import Button from "../../button";
import { Grid, Row, Col } from "react-flexbox-grid/lib";
import axios from "axios";

export default class Purview extends React.Component {
  onSubmit = lessonData => {
    console.log(lessonData);
    axios
      .post("http://localhost:8080/creat-lessons", lessonData)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h2>Preview</h2>
        <Grid fluid className="grid-container">
          <Row className="mian-row">
            {/* <Col className="box" lg={3} {...this.props}> */}
            {/* <div>
                <Context.Consumer>
                  {({ lessonTitles }) =>
                    lessonTitles.map(
                      // lessonTitleId
                      (lessonTitle, i) => {
                        
                        if (lessonTitle.lessonTitleId === 1) {
                          return
                           
                          <div key={i}>
                        
                            <h4>{lessonTitle.lessonTitleName}</h4>
                            <img
                              className="image"
                              width="50px"
                              src={lessonTitle.lessonTitleImage}
                              alt="lesson Title "
                            />
                          </div>;
                           
                          
                        } 
                        if(lessonTitle.lessonTitleId ===2){
                          return

                          <div key={i}>
                            <h4>{lessonTitle.name}</h4>
                            <img
                              className="image"
                              width="50px"
                              src={lessonTitle.lessonTitleImage}
                              alt="lesson Title "
                            />
                          </div>;
                        }
                        if(lessonTitle.lessonTitleId===3){
                          <div key={i}>
                            <h4>{lessonTitle.name}</h4>
                            <img
                              className="image"
                              width="50px"
                              src={lessonTitle.lessonTitleImage}
                              alt="lesson Title "
                            />
                          </div>;


                        }
                        return
                      }
                    )
                  }
                </Context.Consumer>
              </div>
            </Col> */}
            <Col className="box" lg={3} {...this.props}>
              <div>
                <Context.Consumer>
                  {({ tools }) =>
                    tools.map((tool, i) => (
                      // <div className="purview-items" key={i}>
                      //   <h5>{tool.toolName}</h5>
                      //   <img
                      //     className="purview-image"
                      //     width="50px"
                      //     src={tool.toolImage}
                      //     alt="tool"
                      //   />
                      // </div>
                      console.log(tool)
                    ))
                  }
                </Context.Consumer>
              </div>
            </Col>
            <Col className="box" lg={3} {...this.props}>
              <div>
                <Context.Consumer>
                  {({ ingredients }) =>
                    ingredients.map((ingredient, i) => (
                      // <div className="purview-items" key={i}>
                      //   <h5>{ingredient.ingredientName}</h5>

                      //   <img
                      //     className="image"
                      //     width="50px"
                      //     src={ingredient.ingredientImage}
                      //     alt="lesson Title"
                      //     key={i}
                      //   />
                      // </div>
                      console.log(ingredient.ingredientName)
                    ))
                  }
                </Context.Consumer>
              </div>
            </Col>

            <Col className="box" lg={3} {...this.props}>
              <div>
                <Context.Consumer>
                  {({ instructions }) =>
                    instructions.map((instruction, i) => (
                      // <div className="purview-items" key={i}>
                      //   <h5>{instruction.instructionName}</h5>

                      //   <img
                      //     className="image"
                      //     width="50px"
                      //     src={instruction.instructionImage}
                      //     alt="instruction imag"
                      //     key={i}
                      //   />
                      // </div>
                      console.log(instruction)
                    ))
                  }
                </Context.Consumer>
              </div>
            </Col>
          </Row>
        </Grid>
        <Context.Consumer>
          {context => {
            const {
              // onAddLessonTitles,
              lessonTitles,
              tools,
              ingredients,
              instructions,
              previousFormHandler
            } = context;
            return (
              <div>
                <Button
                  className="btn btn-outline-dark "
                  value="previous"
                  onClick={previousFormHandler}
                />
                <Button
                  className="btn btn-outline-dark "
                  value="Save"
                  onClick={() =>
                    this.onSubmit({
                      lessonTitles,
                      tools,
                      ingredients,
                      instructions
                    })
                  }
                />
              </div>
            );
          }}
        </Context.Consumer>
      </div>
    );
  }
}
//  onAddLessonTitles, lessonTitles, previousFormHandler
