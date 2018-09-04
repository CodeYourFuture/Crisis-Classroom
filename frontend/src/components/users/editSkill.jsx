import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
// import decode from 'jwt-decode';
import {Link} from 'react-router-dom';
// import Button from '../button';
import Label from "../label";
import Input from "../input";

class editSkill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      msg: null,
      skill_name: "",
      about_skill: "",
      skill_level: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleEdit = e => {
    e.preventDefault();
    const { id, skill_name, about_skill, skill_level } = this.state;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/edit-skill`, {
        id,
        skill_name,
        about_skill,
        skill_level
      })
      .then(result => {
        if (result) {
          const { msg } = result.data;
          this.setState({ msg });
        }
      })
      .catch(err => {
        if (err.msg) {
          this.setState({ err: err.msg });
        } else {
          this.setState({
            err:
              "Ops! Sorry something happened on the server, please try again later"
          });
        }
      });
  };
  handleDelete = e => {
    e.preventDefault();
    const { id } = this.state;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/delete-skill`, {
        id
      })
      .then(result => {
        if (result) {
          const { msg } = result.data;
          this.setState({ msg });
        }
      })
      .catch(err => {
        if (err.msg) {
          this.setState({ err: err.msg });
        } else {
          this.setState({
            err:
              "Ops! Sorry something happened on the server, please try again later"
          });
        }
      });
  };
  UNSAFE_componentWillMount() {
    const url = this.props.match.url;
    const { id } = this.props.match.params;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}${url}`, { id })
      .then(result => {
        if (result) {
          if (result) {
            const { id, skill_name, about_skill, skill_level } = result.data[0];
            this.setState({ id, skill_name, about_skill, skill_level });
          }
        }
      })
      .catch(err => {
        if (err.msg) {
          this.setState({ err: err.msg });
        } else {
          this.setState({
            err:
              "Ops! Sorry something happened on the server, please try again later"
          });
        }
      });
  }

  render() {
    const { msg, err, skill_name, about_skill, skill_level } = this.state;
    return (
      <div>
        {msg || err ? (
          <div>{msg ? <div>
            <p>{msg}</p>
            <Link to="/user-profile">Your Profile</Link>
          
          </div> : <p className="error">{err}</p>}</div>
        ) : (

          <div>
            <h5>Edit or delete your skill</h5>
            <form>
              <div className="form-group">
                <Label value="Skill name" />
                <Input
                  className="form-control"
                  name="skill_name"
                  type="text"
                  placeholder="Skill name"
                  value={skill_name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <Label value="About Skill" />
                <textarea
                  className="form-control"
                  rows="4"
                  cols="50"
                  name="about_skill"
                  form="usrform"
                  placeholder="More About your skill..."
                  value={about_skill}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <Label value="Skill level" />
                <select
                  name="skill_level"
                  value={skill_level}
                  onChange={this.handleChange}
                  className="form-control"
                >
                  <option>Chose</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advance">Advance</option>
                </select>
              </div>

              <button
                className="btn btn-outline-dark"
                onClick={this.handleEdit}
              >
                Edit
              </button>
              <button
                className="btn btn-outline-dark"
                onClick={this.handleDelete}
              >
                Delete
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(editSkill);
