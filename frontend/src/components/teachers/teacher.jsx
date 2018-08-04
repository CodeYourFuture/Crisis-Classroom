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
    //i need to get teacher from backend
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
            <div>
              {!teacher.avatar ? (
                <div>
                  {teacher.title === "Mr" ? (
                    <img
                      className="user-avatar"
                      src={require("../../image/icons/man-avatar.jpg")}
                      alt="avatar"
                    />
                  ) : (
                    <img
                      className="user-avatar"
                      src={require("../../image/icons/women-avatar.jpg")}
                      alt="avatar"
                    />
                  )}
                </div>
              ) : (
                <img
                  className="user-avatar"
                  src={teacher.avatar}
                  alt="avatar"
                />
              )}
            </div>
            <div>
              <div>
                <h6>
                  {teacher.title} {teacher.first_name} {teacher.sur_name}
                </h6>
                <div>{teacher.about_user}</div>
              </div>
              <div>
                <div>
                  <div>Skills</div>
                  {teacher.skills.map((skill, i) => {
                    return (
                      <ul key={i}>
                        <li>{skill.skill_name}</li>
                        <li>{skill.about_skill}</li>
                        <li>{skill.skill_level}</li>
                        <li>{skill.date}</li>
                      </ul>
                    );
                  })}
                </div>
                <div>
                  <div>Experiences</div>
                  {teacher.experiences.map((experience, i) => {
                    return (
                      <ul key={i}>
                        <li>{experience.what_experience}</li>
                        <li>{experience.what_date}</li>
                        <li>{experience.what_place}</li>
                        <li>{experience.with_whom_teacher}</li>
                        <li>{experience.with_whom_student}</li>
                        <li>{experience.about_experience}</li>
                        <li>{experience.date}</li>
                      </ul>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
