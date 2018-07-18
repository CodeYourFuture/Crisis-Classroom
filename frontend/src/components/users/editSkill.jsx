import React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import decode from 'jwt-decode';
// import {Link} from 'react-router-dom';
import Button from '../button';
import Label from '../label';
import Input from '../input';

class editSkill extends React.Component {
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
  onSubmit = (e) => {
    e.preventDefault();
    const { id } = this.state;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/edit-skill/${id}`, {
        id,
      })
      .then((result) => {
        if (result) {
          const { id, skillName, aboutSkill, skillLevel } = result.data[0];
          this.setState({ id, skillName, aboutSkill, skillLevel });
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
  UNSAFE_componentWillMount() {
    const url = this.props.match.url;
    const { id } = this.props.match.params;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}${url}`, { id })
      .then((result) => {
        if (result) {
          if (result) {
            const { id, skillName, aboutSkill, skillLevel } = result.data[0];
            this.setState({ id, skillName, aboutSkill, skillLevel });
          }
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

          <button className="btn btn-outline-dark" onClick={this.handleEdit}>
            Edit
          </button>
          <button className="btn btn-outline-dark" onClick={this.handleDelete}>
            Delete
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(editSkill);
