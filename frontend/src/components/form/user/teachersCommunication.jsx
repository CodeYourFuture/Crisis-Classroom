import React from "react";
import axios from "axios";
import decode from "jwt-decode";

export default class AddExperience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      msg: null,
      messege: "",
      send_to_email: false
    };
  }
  handleChangeCheckbox = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { receiverId } = this.props;
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const senderId = decoded.id;
    const { messege, send_to_email } = this.state;

    
    this.props.onMessageSend(this.state.messege)

    axios
      .post(`${process.env.REACT_APP_DOMAIN}/messenger`, {
        senderId,
        receiverId,
        messege,
        send_to_email
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
    // this.props.getMesseges()
  };
  render() {
    const { err, msg } = this.state;
    return (
      <div>
        <form>
          <div className="form-group">
            <input
              className="form-control messenger-input"
              name="messege"
              form="usrform"
              placeholder="Write a messege ... "
              value={this.state.messege}
              onChange={this.handleChange}
            />
          </div>
          <div className="messenger-send-btn-checkbox">
            <div className="form-group messenger-checkbox">
              <input
                type="checkbox"
                name="send_to_email"
                onChange={this.handleChangeCheckbox}
              />
              {"  "}
              <label>Send as a email </label>
            </div>
            <div className="messenger-btn-div">
              <button
                className="btn btn-outline-dark messenger-btn"
                onClick={this.handleSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
