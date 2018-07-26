import React from 'react';
// import { Link } from 'react-router-dom';
// import Button from '../../button';
// import Label from '../../label';
import Input from '../../input';
import axios from 'axios';
import decode from 'jwt-decode';

export default class AddExperience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      msg: null,
      whatExperience: '',
      when: '',
      where: '',
      withWhomStudent: '',
      withWhomTeacher: '',
      aboutExperience: '',
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('id_token');
    const decoded = decode(token);
    const user_id = decoded.id;
    const {
      whatExperience,
      when,
      where,
      withWhomStudent,
      withWhomTeacher,
      aboutExperience,
    } = this.state;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/creat-experience`, {
        user_id,
        whatExperience,
        when,
        where,
        withWhomStudent,
        withWhomTeacher,
        aboutExperience,
      })
      .then((result) => {
        if (result) {
          const { msg } = result.data;
          this.setState({ msg });
        }
      })
      .catch((err) => {
        if (err.msg) {
          this.setState({ err: err.msg });
        } else {
          this.setState({
            err
          });
        }
      });
  };
  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <Input
              className="form-control"
              name="whatExperience"
              type="text"
              placeholder="what Experience"
              value={this.state.whatExperience}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <Input
              className="form-control"
              name="when"
              type="text"
              placeholder="when"
              value={this.state.when}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <Input
              className="form-control"
              name="where"
              type="text"
              placeholder="where"
              value={this.state.where}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <Input
              className="form-control"
              name="withWhomStudent"
              type="text"
              placeholder="Student you work with"
              value={this.state.withWhomStudent}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <Input
              className="form-control"
              name="withWhomTeacher"
              type="text"
              placeholder="Teacher you work with"
              value={this.state.withWhomTeacher}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <textarea
              className="form-control"
              rows="4"
              cols="50"
              name="aboutExperience"
              form="usrform"
              placeholder="More About your experience..> Cane be a short story"
              value={this.state.aboutExperience}
              onChange={this.handleChange}
            />
          </div>
          <button className="btn btn-outline-dark" onClick={this.handleSubmit}>
            Add
          </button>
        </form>
      </div>
    );
  }
}
