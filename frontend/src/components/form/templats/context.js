import React from "react";

const Context = React.createContext({
  id:"",
  lesson_title: "",
  lesson_title_image: "",
  time_to_prepare: "",
  time_to_prepare_image: "",
  number_of_people: "",
  number_of_people_image: "",

  tools: [],
  ingredients: [],
  instructions: [],
  onAddlesson_titles: null,
  onAddTools: null,
  onAddIngredients: null,
  onAddInstructions: null,
  previousFormHandler: null
});
export default Context;
