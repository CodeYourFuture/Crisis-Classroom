import React from "react";
// import { Link } from "react-router-dom";
// import { Grid, Row, Col } from "react-flexbox-grid/lib";
// import axios from "axios";
// import Button from "../button";

export default class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: null,
      err: null,
      msg: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const teacher = this.props.teachers.find(g => g.id === parseInt(id, 10));
    if (teacher) {
      this.setState({ teacher: teacher });
    } else {
      this.setState({ err: "teacher not found" });
    }
  }

  render() {
    const { teacher, err, msg } = this.state;
    console.log(teacher)
    if (err) {
      return (
          <h3>
            {err}
            {msg}
          </h3>
      );
    }
    if (teacher === null) {
      return <h1>Loading....</h1>;
    }
    return (
      <div>
        {err || msg ? (
          <h5 className="error">
            {err}
            {msg}
          </h5>
        ) : (
          <div>
            
          </div>
        )}
      </div>
    );
  }
}
