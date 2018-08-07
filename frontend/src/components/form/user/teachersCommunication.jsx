import React from "react";
import axios from "axios";
import decode from "jwt-decode";

export default class AddExperience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      msg: null,
      messege: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { resiverId } = this.props;
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const senderId = decoded.id;
    const { messege } = this.state;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/teachers-communication`, {
        senderId,
        resiverId,
        messege
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
              "Sorry something happened on the server, please try again later."
          });
        }
      });
  };
  render() {
    const { err, msg } = this.state;
    return (
      <div>
        {msg || err ? (
          <p>
            {msg}
            {err}
          </p>
        ) : (
          <form>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="2"
                cols="10"
                name="messege"
                form="usrform"
                placeholder="Send a quick messege ... "
                value={this.state.messege}
                onChange={this.handleChange}
              />
            </div>
            <button
              className="btn btn-outline-dark"
              onClick={this.handleSubmit}
            >
              Send
            </button>
          </form>
        )}
      </div>
    );
  }
}
