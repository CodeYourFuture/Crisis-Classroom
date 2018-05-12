import React from "react";

const Context = React.createContext({
  title: "",
  duration: "",
  numberOfPeople: "",
  ingredients: [],
  instructions: [],
  tools: [],
  onAddTools: null,
  onAddInstructions: null
});
export default Context;
