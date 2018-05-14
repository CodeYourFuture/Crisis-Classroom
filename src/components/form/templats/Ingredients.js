import React from "react";
import Input from "../../input";
import Label from "../../label";
import Button from "../../button";
import Context from "./context";
import ReactS3 from "react-s3";
import "./style.css";

const config = {
  bucketName: "crisis-class-room",
  region: "eu-west-2",
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: props.ingredients
    };
  }
  

  onChangeIngredientshandler = (e, index) => {
    const ingredient = this.state.ingredients[index];
    const newIngredientName = {
      ...ingredient,
      [e.target.name]: e.target.value
    };
    this.setState({
      ingredients: this.state.ingredients.map(
        (ingredient, i) => (i === index ? newIngredientName : ingredient)
      )
    });
  };

  onChangeImageIngredientshandler = (e, index) => {
    const ingredient = this.state.ingredients[index];
    const file = e.target.files[0];
    ReactS3.upload(file, config).then(result => {
      const newIngredientImage = { ...ingredient, ingredientImage: result.location };
      this.setState({
        ingredients: this.state.ingredients.map(
          (ingredient, i) => (i === index ? newIngredientImage : ingredient)
        )
      });
    });
  };

  addIngredientsHandler = e => {
    this.setState({
      ingredients: [
        ...this.state.ingredients,
        { ingredientId: this.state.ingredients.length + 1, ingredientName: "", ingredientImage: "" }
      ]
    });
  };

  removeIngredientsHandler =ingredientIid => {
    const { ingredients } = this.state;
    ingredients.forEach(ingredient => {
      if (ingredient.ingredientIid ===ingredientIid) {
        ingredient.ingredientImage = null;
      }
    });
    this.setState({
      ingredients
    });
  };

  render() {
    return (
      <div>
        <div>
          <h2> Add Ingredients </h2>
          {this.state.ingredients &&
            this.state.ingredients.map(({ ingredientName, ingredientImage, ingredientId }, i) => {
              return (
                <div className="lessonForm" key={ingredientId}>
                  <div className="form-group">
                    <Label value="Ingredient Name" />
                    <div className="lessonInput">
                      <Input
                        className="form-control"
                        type="text"
                        name="ingredientName"
                        onChange={e => this.onChangeIngredientshandler(e, i)}
                        placeholder="Ingredient"
                        value={ingredientName}
                      />
                      {!ingredientImage ? (
                        <div>
                          <label className="btn btn-outline-dark">
                            Upload an image
                            <input
                              style={{ display: "none" }}
                              type="file"
                              name="ingredientImage"
                              onChange={e =>
                                this.onChangeImageIngredientshandler(e, i)
                              }
                              accept="image/*"
                            />
                          </label>
                        </div>
                      ) : (
                        <div
                          className="image-container"
                          onClick={() => this.removeIngredientsHandler(ingredientId)}
                        >
                          <img
                            className="image"
                            width="100px"
                            src={ingredientImage}
                            alt="ingredient"
                          />
                          <div className="middle">
                            <div className="text">Remove</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <Button
          className="btn btn-outline-dark "
          value="Add"
          onClick={this.addIngredientsHandler}
        />
        &nbsp;
        <div style={{display:"flex"}}>
          <Button
            className="btn btn-outline-dark "
            value="previous"
            onClick={this.props.previousFormHandler}
          />
          &nbsp;
          <Button
            className="btn btn-outline-dark "
            value="Next"
            onClick={() => this.props.onAddIngredients(this.state.ingredients)}
          />
        </div>
      </div>
    );
  }
}

export default class IngredientsFormWrapper extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {({ onAddIngredients, ingredients, previousFormHandler }) => (
          <Form
            ingredients={ingredients}
            onAddIngredients={onAddIngredients}
            previousFormHandler={previousFormHandler}
          />
        )}
      </Context.Consumer>
    );
  }
}
