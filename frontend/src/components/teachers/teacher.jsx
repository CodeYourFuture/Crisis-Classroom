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
      socket:null
    };
  }
  UNSAFE_componentWillMount() {
    var socket = io(process.env.REACT_APP_DOMAIN);
    this.setState({ socket });
  }
  

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/teachers`, { id })
      .then(result => {
        if (result.msg) {
          this.setState({ msg: result.msg });
        } else if (result) {
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
            <Messenger teacher={teacher} socket={this.state.socket} />
          </div>
        )}
      </div>
    );
  }
}
