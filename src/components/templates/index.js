import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Fakedb from "../../data/Fakedb.json";
import FirstPage from "./FirstPage/index";
import SearchForInpud from "../form/templet/searchForTemplet"
import "./style.css";

function searchingFor(term) {
  return (db) => {
    // console.log(term)
    return  term && db.lessons.lessonTitle.toLowerCase().includes(term.toLowerCase());
  }
}

export default class TemplatIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: null,
    }
    // this.searchHandler = this.searchHandler.bind(this)
  }
  searchHandler = (e) => {
    this.setState({ term: e.target.value, result: e.target.value.length ? true : false })
  }

  render() {
    let searchResult = Fakedb.filter(searchingFor(this.state.term));
    return (
      <div>
        <h1>Templates</h1>
        <SearchForInpud searchHandler={this.searchHandler}/>
        <div className="templets">
          {searchResult.map((e, i) => (
            <Route exact path="/templates/temp" key={i}>
              <div className="templetsItem">
                <Link to={`/templates/temp/${e.lessons.id}`} key={i}>
                  {e.lessons.lessonTitle || "[no description]"}
                  <img
                    className="templetsItemImg"
                    src={require(`../../image/archive/${e.lessons.lessonImg}`)}
                    alt={e.lessons.lessonTitle}
                  />
                </Link>
              </div>
            </Route>
          ))}
        </div>
        <Route
          path="/templates/temp/:eId"
          render={({ match }) => (
            <FirstPage
              lesson={Fakedb.find(
                g => g.lessons.id === parseInt(match.params.eId, 10)
              )}
            />
          )}
        />
      </div>
    );
  }
}


// let searchResult = Fakedb.filter(e => {
//   return (
//     e.lessonTitle
//       .toLowerCase()
//       .indexOf(this.props.search.toLowerCase()) !== -1
//   );
// });