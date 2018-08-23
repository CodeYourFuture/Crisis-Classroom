import React from "react";
import axios from "axios";
import decode from "jwt-decode";
import AddSkill from "../form/user/addSkill";
import AddExperience from "../form/user/addExperience";

import { Link } from "react-router-dom";
// import Button from '../button';
// import Label from '../label';
import "./style.css";

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      msg: null,
      title: "",
      email: "",
      first_name: "",
      sur_name: "",
      user_name: "",
      avatar: null,
      about_user: "",
      addSkill: false,
      showSkills: false,
      showExperience: false,
      addExperience: false,
      skills: [],
      experiences: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const id = decoded.id;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/user-profile`, { id })
      .then(result => {
        if (result) {
          const {
            title,
            first_name,
            sur_name,
            user_name,
            email,
            avatar,
            about_user
          } = result.data[0];
          const { skills, experiences } = result.data;
          this.setState({
            title,
            first_name,
            sur_name,
            user_name,
            email,
            avatar,
            about_user,
            skills,
            experiences
          });
        }
      })
      .catch(err => {
        if (err.msg) {
          this.setState({ err: err.msg });
        } else {
          this.setState({
            err:
              "Sorry something happened on the server, please try again later"
          });
        }
      });
  }

  ShowAddSkill = e => {
    this.setState({ addSkill: e });
  };
  ShowAddExperience = e => {
    this.setState({ addExperience: e });
  };

  showHandler = e => {
    if (e === "skills") {
      this.setState({
        showSkills: true,
        showExperience: false,
        addExperience: false
      });
    }
    if (e === "experience") {
      this.setState({
        showSkills: false,
        showExperience: true,
        addSkill: false
      });
    }
  };

  showBackData = success => {
    setTimeout(() => {
      success && this.componentDidMount();
      this.setState({ addSkill: false, addExperience: false });
    }, 1500);
  };

  render() {
    const {
      title,
      first_name,
      sur_name,
      user_name,
      email,
      err,
      msg,
      avatar,
      about_user,
      addSkill,
      skills,
      experiences,
      showSkills,
      showExperience,
      addExperience
    } = this.state;
    return (
      <div >
        {err || msg ? (
          <div>
            {msg && <p>{msg}</p>}
            {err && <p className="error">{err}</p>}
          </div>
        ) : (
          <div className="user">
            <div className="user-avatar">
              {!avatar ? (
                <div>
                  {title === "Mr" ? (
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
                <img className="user-avatar" src={avatar} alt="avatar" />
              )}
            </div>
            <div className="user-user-info">
              <p>{first_name}</p>
              <p>{sur_name}</p>
              <p>{user_name}</p>
              <p>{email}</p>
              <p>{about_user}</p>
            </div>
            <div>
              <button
                name="showSkills"
                value={showSkills}
                onClick={() => this.showHandler("skills")}
              >
                Skills
              </button>
              <button
                value={showExperience}
                onClick={() => this.showHandler("experience")}
              >
                Experience
              </button>
              {showSkills && (
                <div>
                  <div>
                    {skills.map((skill, i) => {
                      return (
                        <Link to={`/edit-skill/${skill.id}`} key={i}>
                          <div className="skill">
                            <p>{skill.skill_name}</p>
                            <h6>{skill.about_skill}</h6>
                            <h6>{skill.skill_level}</h6>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  {addSkill ? (
                    <div>
                      <AddSkill showBackData={this.showBackData} />
                    </div>
                  ) : (
                    <button onClick={() => this.ShowAddSkill(true)}>
                      Add Skills
                    </button>
                  )}
                </div>
              )}
              {showExperience && (
                <div>
                  <div>
                    {experiences.map((experience, i) => {
                      return (
                        <Link to={`/edit-experience/${experience.id}`} key={i}>
                          <div className="skill">
                            <p>{experience.what_experience}</p>
                            <h6>{experience.what_date}</h6>
                            <h6>{experience.what_place}</h6>
                            <h6>{experience.with_whom_teacher}</h6>
                            <h6>{experience.with_whom_student}</h6>
                            <h6>{experience.about_experience}</h6>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  {addExperience ? (
                    <div>
                      <AddExperience showBackData={this.showBackData} />
                    </div>
                  ) : (
                    <button onClick={() => this.ShowAddExperience(true)}>
                      Add Experience
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
