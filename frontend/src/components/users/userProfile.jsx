import React from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import AddSkill from '../form/user/addSkill';
import AddExperience from '../form/user/addExperience';

import { Link } from 'react-router-dom';
// import Button from '../button';
// import Label from '../label';
import './style.css';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      msg: null,
      title: '',
      email: '',
      firstName: '',
      surName: '',
      userName: '',
      avatar: null,
      aboutUser: '',
      addSkill: false,
      showSkills: false,
      showExperience: false,
      skills: [],
    };
  }

  UNSAFE_componentWillMount() {
    const token = localStorage.getItem('id_token');
    const decoded = decode(token);
    const userName = decoded.userName;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/user-profile`, { userName })
      .then((result) => {
        if (result) {
          const {
            title,
            firstName,
            surName,
            userName,
            email,
            avatar,
            aboutUser,
          } = result.data[0];
          const { skills } = result.data;
          this.setState({
            title,
            firstName,
            surName,
            userName,
            email,
            avatar,
            aboutUser,
            skills,
          });
        }
      })
      .catch((err) => {
        if (err.msg) {
          this.setState({ err: err.msg });
        } else {
          this.setState({
            err:
              'Ops! Sorry something happened on the server, please try again later',
          });
        }
      });
  }

  ShowAddSkill = (e) => {
    this.setState({ addSkill: e });
  };
  showHandler = (e) => {
    console.log(e.target.value);
    if (!e) {
      this.setState({ showSkills: true });
    } else this.setState({ showSkills: false });
  };
  render() {
    const {
      title,
      firstName,
      surName,
      userName,
      email,
      err,
      msg,
      avatar,
      aboutUser,
      addSkill,
      skills,
      showSkills,
      showExperience,
    } = this.state;
    return (
      <div className="user">
        <h5>{msg}</h5>
        <h5>{err}</h5>
        <div className="user-avatar">
          {!avatar ? (
            <div>
              {title === 'Mr' ? (
                <img
                  className="user-avatar"
                  src={require('../../image/icons/man-avatar.jpg')}
                  alt="avatar"
                />
              ) : (
                <img
                  className="user-avatar"
                  src={require('../../image/icons/women-avatar.jpg')}
                  alt="avatar"
                />
              )}
            </div>
          ) : (
            <img className="user-avatar" src={avatar} alt="avatar" />
          )}
        </div>
        <div className="user-user-info">
          <h5>{firstName}</h5>
          <h5>{surName}</h5>
          <h5>{userName}</h5>
          <h5>{email}</h5>
          <h5>{aboutUser}</h5>
        </div>
        <div>
          <button name="showSkills" value={showSkills} onClick={this.showHandler}>
            Skills
          </button>
          <button value={showExperience} onClick={this.showHandler}>
            Experience
          </button>
          {showSkills ? (
            <div>
              <div>
                {skills.map((skill, i) => {
                  return (
                    <Link to={`/edit-skill/${skill.id}`} key={i}>
                      <div className="skill">
                        <h5>{skill.skillName}</h5>
                        <h6>{skill.aboutSkill}</h6>
                        <h6>{skill.skillLevel}</h6>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {addSkill ? (
                <div>
                  <AddSkill />
                  <AddExperience />
                </div>
              ) : (
                <button onClick={() => this.ShowAddSkill(true)}>
                  Add Skills
                </button>
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}
