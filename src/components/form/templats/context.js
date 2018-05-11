import React from "react";

const Context = React.createContext({
  title: "",
  duration: "",
  numberOfPeople: "",
  ingredients: [],
  instructions: [],
  tools: [],
  onAddTools: null
});
export default Context;
