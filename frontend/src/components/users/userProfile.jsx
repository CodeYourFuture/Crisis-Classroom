import React from "react";
import axios from "axios";
import decode from "jwt-decode";
import UpdateProfile from "../form/user/updatProfile";

// import { Link } from "react-router-dom";
import EditSkill from "./editSkill";
import EditExperience from "./editExperience";
// import Button from '../button';
// import Label from '../label';

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
      skills: [],
      experiences: [],
      user: false,
      edit_skill: 0,
      edit_experience: 0
    };
  }
  EditSkillhandler = id => {
    this.setState({ edit_skill: id });
  };
  EditExperiencehandler = id => {
    this.setState({ edit_experience: id });
  };
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
            experiences,
            user: true
          });
        }
      })
      .catch(err => {
        if (err.msg) {
          this.setState({ err: err.msg, user: true });
        } else {
          this.setState({
            err:
              "Sorry something happened on the server, please try again later",
            user: true
          });
        }
      });
  }

  showBackData = () => {
    setTimeout(() => {
      this.componentDidMount();
      this.setState({ edit_skill: 0, edit_experience: 0 });
    }, 1500);
  };

  render() {
    const {
      title,
      first_name,
      sur_name,
      user_name,
      err,
      msg,
      avatar,
      about_user,
      skills,
      experiences,
      user,
      edit_skill,
      edit_experience
    } = this.state;
    if (user === false) {
      return <h1>Loading....</h1>;
    }
    return (
      <div className="container">
        {err || msg ? (
          <div>
            {msg && <p>{msg}</p>}
            {err && <p className="error">{err}</p>}
          </div>
        ) : (
          <div className="user">
            <div className="user-info-div">
              <div className="user-avatar-div">
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
                <div className="w-100">
                  <h5>
                    {first_name} {sur_name}
                  </h5>
                  <h6>{user_name}</h6>
                  <UpdateProfile showBackData={this.showBackData} />
                </div>
              </div>
              <div className="user-info">
                <p>{about_user}</p>
              </div>
            </div>
            <hr />
            <div className="user-info-div">
              <div className="user-skills">
                <h5>Skills</h5>
                {skills.map((skill, i) => {
                  return (
                    <div className="user-skill" key={i}>
                      {edit_skill === skill.id ? (
                        <EditSkill
                          skill_id={skill.id}
                          showBackData={this.showBackData}
                        />
                      ) : (
                        <div>
                          <p>{skill.skill_name}</p>
                          <h6>{skill.about_skill}</h6>
                          <h6>{skill.skill_level}</h6>
                          <button
                            className="btn btn-outline-dark"
                            onClick={() => this.EditSkillhandler(skill.id)}
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="user-experiences">
                <div>
                <h5>Experiences</h5>
                  {experiences.map((experience, i) => {
                    return (
                      <div className="user-experience" key={i}>
                        {edit_experience === experience.id ? (
                          <EditExperience
                            experience_id={experience.id}
                            showBackData={this.showBackData}
                          />
                        ) : (
                          <div>
                            <p>{experience.what_experience}</p>
                            <h6>{experience.what_date}</h6>
                            <h6>{experience.what_place}</h6>
                            <h6>{experience.with_whom_teacher}</h6>
                            <h6>{experience.with_whom_student}</h6>
                            <h6>{experience.about_experience}</h6>
                            <button
                              className="btn btn-outline-dark"
                              onClick={() =>
                                this.EditExperiencehandler(experience.id)
                              }
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </div>
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
