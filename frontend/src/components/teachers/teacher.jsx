import React from "react";
import Messenger from "./mesenger";
import axios from "axios";
import io from "socket.io-client";

export default class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: null,
      err: null,
      msg: null,
      socket: null
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    var socket = io(process.env.REACT_APP_DOMAIN);
    this.setState({ socket });

    axios
      .post(`${process.env.REACT_APP_DOMAIN}/teachers`, { id })
      .then(result => {
        if (result.msg) {
          this.setState({ msg: result.msg });
        } else if (result.data) {
          this.setState({ teacher: result.data[0] });
        } else
          this.setState({
            err:
              "Sorry something happened on the server, please try again later."
          });
      })
      .catch(error => {
        if (error) {
          this.setState({
            err:
              "Sorry something happened on the server, please try again later."
          });
        }
      });
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
              <div className="teacher-detailes">
                <div className="teacher-avatar-div">
                  {!teacher.avatar ? (
                    <div>
                      {teacher.title === "Mr" ? (
                        <img
                          className="teacher-avatar"
                          src={require("../../image/icons/man-avatar.jpg")}
                          alt="avatar"
                        />
                      ) : (
                        <img
                          className="teacher-avatar"
                          src={require("../../image/icons/women-avatar.jpg")}
                          alt="avatar"
                        />
                      )}
                    </div>
                  ) : (
                    <img
                      className="teacher-avatar"
                      src={teacher.avatar}
                      alt="avatar"
                    />
                  )}
                  <h4>
                    {teacher.title} {teacher.first_name} {teacher.sur_name}
                  </h4>
                  <Messenger teacher={teacher} socket={this.state.socket} />
                </div>
                <div className="about-teacher">
                  <p>{teacher.about_user}</p>
                </div>
              </div>
              <hr />
              <div className="teacher-detailes">
                {teacher.skills.length >= 1 && (
                  <div className="teacher-skill">
                    <h4>Skills</h4>
                    <hr />
                    {teacher.skills.map((skill, i) => {
                      return (
                        <div key={i}>
                          <h6>{skill.skill_name}</h6>
                          <h6>{skill.about_skill}</h6>
                          <h6>{skill.skill_level}</h6>
                          {/* <h6>{skill.date}</h6> */}
                          <hr />
                        </div>
                      );
                    })}
                  </div>
                )}
                {teacher.experiences.length >= 1 &&<div className="teacher-experience">
                  <h4>Experiences</h4>
                  <hr />
                  <div>
                    {teacher.experiences.map((experience, i) => {
                      return (
                        <div key={i}>
                          <h6>{experience.what_experience}</h6>
                          <h6>{experience.what_date}</h6>
                          <h6>{experience.what_place}</h6>
                          <h6>{experience.with_whom_teacher}</h6>
                          <h6>{experience.with_whom_student}</h6>
                          <h6>{experience.about_experience}</h6>
                          {/* <h6>{experience.date}</h6> */}
                          <hr />
                        </div>
                      );
                    })}
                  </div>
                </div>}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
