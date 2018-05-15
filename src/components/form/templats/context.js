import React from "react";

const Context = React.createContext({
  lessonTitles: [],
  tools: [],
  ingredients: [],
  instructions: [],
  onAddLessonTitles: null,
  onAddTools: null,
  onAddIngredients: null,
  onAddInstructions: null,
  previousFormHandler: null,
});
export default Context;
