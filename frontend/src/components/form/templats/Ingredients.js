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
    const newingredient_name = {
      ...ingredient,
      [e.target.name]: e.target.value,
    };
    this.setState ({
      ingredients: this.state.ingredients.map (
        (ingredient, i) => (i === index ? newingredient_name : ingredient)
      ),
    });
  };

  onChangeImageIngredientshandler = (e, index) => {
    const ingredient = this.state.ingredients[index];
    const data = new FormData ();
    data.append ('image', e.target.files[0]);
    axios.post (`${process.env.REACT_APP_DOMAIN}/files`, data).then (result => {
      const newingredient_image = {
        ...ingredient,
        ingredient_image: result.data.image,
      };
      this.setState ({
        ingredients: this.state.ingredients.map (
          (ingredient, i) => (i === index ? newingredient_image : ingredient)
        ),
      });
    });
  };

  addIngredientsHandler = e => {
    this.setState ({
      ingredients: [
        ...this.state.ingredients,
        {
          ingredient_id: this.state.ingredients.length + 1,
          ingredient_name: '',
          ingredient_image: '',
        },
      ],
    });
  };

  removeIngredientsImgHandler = ingredient_id => {
    const {ingredients} = this.state;
    ingredients.forEach (ingredient => {
      if (ingredient.ingredient_id === ingredient_id) {
        ingredient.ingredient_image = null;
      }
    });
    this.setState ({
      ingredients,
    });
  };

  removeIngredientsHandler = i => {
    const {ingredients} = this.state;
    let removeResult = ingredients.filter (
      ingredient => ingredient.ingredient_id !== i
    );
    this.setState ({
      ingredients: removeResult,
    });
  };

  render () {
    return (
      <div className="template-form">
        <div>
          {this.props.id
            ? <h2> Edit, Remove or add Ingredients </h2>
            : <h2> Add Ingredients </h2>}
          {this.state.ingredients &&
            this.state.ingredients.map (
              ({ingredient_name, ingredient_image, ingredient_id}, i) => {
                return (
                  <div key={i}>
                    <div className="form-group">
                      <Label value="Ingredient Name" />
                      <div className="lessonInput">
                        <Input
                          className="form-control"
                          type="text"
                          name="ingredient_name"
                          onChange={e => this.onChangeIngredientshandler (e, i)}
                          placeholder="Ingredient"
                          value={ingredient_name}
                        />
                        {!ingredient_image
                          ? <div>
                              <label className="btn btn-outline-dark">
                                Upload an image
                                <input
                                  style={{display: 'none'}}
                                  type="file"
                                  name="ingredient_image"
                                  onChange={e =>
                                    this.onChangeImageIngredientshandler (e, i)}
                                  accept="image/*"
                                />
                              </label>
                            </div>
                          : <div
                              className="image-container"
                              onClick={() =>
                                this.removeIngredientsImgHandler (ingredient_id)}
                            >
                              <img
                                className="image"
                                width="100px"
                                src={ingredient_image}
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
                            this.removeIngredientsHandler (ingredient_id)}
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
        <hr/>
        <div className="template-form-btn">
        <div>
          <Button
            className="btn btn-outline-dark "
            value="previous"
            onClick={this.props.previousFormHandler}
          />
          </div>
          <div className="btn-right">
          <Button
            className="btn btn-outline-dark "
            value="Next"
            onClick={() => this.props.onAddIngredients (this.state.ingredients)}
          />
          </div>
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
