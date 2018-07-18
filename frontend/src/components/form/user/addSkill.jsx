import React from 'react';
// import { Link } from 'react-router-dom';
// import Button from '../../button';
import Label from '../../label';
import Input from '../../input';
import axios from 'axios';
import decode from 'jwt-decode';

export default class AddSkill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      msg: null,
      skillName: '',
      aboutSkill: '',
      skillLevel: '',
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = () => {
    const token = localStorage.getItem('id_token');
    const decoded = decode(token);
    const userId = decoded.id;
    const { skillName, aboutSkill, skillLevel } = this.state;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/creat-skill`, {
        userId,
        skillName,
        aboutSkill,
        skillLevel,
      })
      .then((result) => {
        if (result) {
          this.setState({});
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
  };
  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <Label value="Skill name" />
            <Input
              className="form-control"
              name="skillName"
              type="text"
              placeholder="Skill name"
              value={this.state.skillName}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <Label value="About Skill" />
            <textarea
              className="form-control"
              rows="4"
              cols="50"
              name="aboutSkill"
              form="usrform"
              placeholder="More About your skill..."
              value={this.state.aboutSkill}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <Label value="Skill level" />
            <select
              name="skillLevel"
              value={this.state.skillLevel}
              onChange={this.handleChange}
              className="form-control"
            >
              <option>Chose</option>
              <option value="begganer">Beggener</option>
              <option value="intermdiat">Intermdiat</option>
              <option value="advance">Advance</option>
            </select>
          </div>

          <button className="btn btn-outline-dark" onClick={this.handleSubmit}>
            Add
          </button>
        </form>
      </div>
    );
  }
}
