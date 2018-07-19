import React from 'react';
import Input from '../../input';
import Label from '../../label';
import Button from '../../button';
import Context from './context';
import axios from 'axios';

class Form extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      ingredients: props.ingredients,
    };
  }

  onChangeIngredientshandler = (e, index) => {
    const ingredient = this.state.ingredients[index];
    const newIngredientName = {
      ...ingredient,
      [e.target.name]: e.target.value,
    };
    this.setState ({
      ingredients: this.state.ingredients.map (
        (ingredient, i) => (i === index ? newIngredientName : ingredient)
      ),
    });
  };

  onChangeImageIngredientshandler = (e, index) => {
    const ingredient = this.state.ingredients[index];
    const data = new FormData ();
    data.append ('image', e.target.files[0]);
    axios.post (`${process.env.REACT_APP_DOMAIN}/files`, data).then (result => {
      const newIngredientImage = {
        ...ingredient,
        ingredientImage: result.data.image,
      };
      this.setState ({
        ingredients: this.state.ingredients.map (
          (ingredient, i) => (i === index ? newIngredientImage : ingredient)
        ),
      });
    });
  };

  addIngredientsHandler = e => {
    this.setState ({
      ingredients: [
        ...this.state.ingredients,
        {
          ingredientId: this.state.ingredients.length + 1,
          ingredientName: '',
          ingredientImage: '',
        },
      ],
    });
  };

  removeIngredientsImgHandler = ingredientId => {
    const {ingredients} = this.state;
    ingredients.forEach (ingredient => {
      if (ingredient.ingredientId === ingredientId) {
        ingredient.ingredientImage = null;
      }
    });
    this.setState ({
      ingredients,
    });
  };

  removeIngredientsHandler = i => {
    const {ingredients} = this.state;
    let removeResult = ingredients.filter (
      ingredient => ingredient.ingredientId !== i
    );
    this.setState ({
      ingredients: removeResult,
    });
  };

  render () {
    return (
      <div>
        <div>
          {this.props.id
            ? <h2> Edit, Remove or add Ingredients </h2>
            : <h2> Add Ingredients </h2>}
          {this.state.ingredients &&
            this.state.ingredients.map (
              ({ingredientName, ingredientImage, ingredientId}, i) => {
                return (
                  <div className="lessonForm" key={i}>
                    <div className="form-group">
                      <Label value="Ingredient Name" />
                      <div className="lessonInput">
                        <Input
                          className="form-control"
                          type="text"
                          name="ingredientName"
                          onChange={e => this.onChangeIngredientshandler (e, i)}
                          placeholder="Ingredient"
                          value={ingredientName}
                        />
                        {!ingredientImage
                          ? <div>
                              <label className="btn btn-outline-dark">
                                Upload an image
                                <input
                                  style={{display: 'none'}}
                                  type="file"
                                  name="ingredientImage"
                                  onChange={e =>
                                    this.onChangeImageIngredientshandler (e, i)}
                                  accept="image/*"
                                />
                              </label>
                            </div>
                          : <div
                              className="image-container"
                              onClick={() =>
                                this.removeIngredientsImgHandler (ingredientId)}
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
                            </div>}
                        &nbsp;
                        <Button
                          className="btn btn-outline-danger lessonBtn"
                          value="Remove"
                          onClick={() =>
                            this.removeIngredientsHandler (ingredientId)}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            )}
        </div>
        <Button
          className="btn btn-outline-dark "
          value="Add"
          onClick={this.addIngredientsHandler}
        />
        &nbsp;
        <div style={{display: 'flex'}}>
          <Button
            className="btn btn-outline-dark "
            value="previous"
            onClick={this.props.previousFormHandler}
          />
          &nbsp;
          <Button
            className="btn btn-outline-dark "
            value="Next"
            onClick={() => this.props.onAddIngredients (this.state.ingredients)}
          />
        </div>
      </div>
    );
  }
}

export default class IngredientsFormWrapper extends React.Component {
  render () {
    return (
      <Context.Consumer>
        {({onAddIngredients, ingredients, previousFormHandler}) => (
          <Form
            ingredients={ingredients}
            onAddIngredients={onAddIngredients}
            previousFormHandler={previousFormHandler}
            {...this.props}
          />
        )}
      </Context.Consumer>
    );
  }
}
