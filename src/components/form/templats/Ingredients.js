import React from "react";
import Label from "../../label";
import Input from "../../input";
import Button from "../../button";

export default class Ingredients extends React.Component {
  render() {
    return (
      <div>
        <h2> Ingredients </h2>
        <div>
          {this.props.userData.ingredientsFields &&
            this.props.userData.ingredientsFields.map((fields, key) => {
              return (
                <div className="form-group" key={key}>
                  <Label value="Ingredient Name" />
                  <div className="row">
                    <Input
                      className="form-control"
                      type="text"
                      name="ingredient"
                      onChange={this.props.onChangehandler}
                      placeholder="ingredient"
                      value={this.props.userData.ingredient}
                    />
                    &nbsp;
                    <div>
                      <label className="btn btn-outline-dark">
                        Chose a file
                        <input
                          style={{ display: "none" }}
                          type="file"
                          onChange={this.props.handleUploadFile}
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          &nbsp;
          <Button
            className="btn btn-outline-dark"
            value="Add"
            onClick={this.props.addIngredientsHandler}
          />
          &nbsp;
        </div>
      </div>
    );
  }
}
