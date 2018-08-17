import React from "react";
import axios from "axios";
import decode from "jwt-decode";

export default class TeachersCommunication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      msg: null,
      message: "",
      send_to_email: false,
      messageSent: null,
      isTyping:false
    };
  }

  handleChangeCheckbox = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };
//send typing
  sendTyping() {
    this.lastUpdateTime = Date.now();
    if (!this.state.isTyping) {
      this.setState({ isTyping: true });
      this.props.sendTyping(true);
      this.startCheckingTyping();
    }
  }
  startCheckingTyping() {
    this.typingInterval = setInterval(() => {
      if (Date.now() - this.lastUpdateTime > 300) {
        this.setState({ isTyping: false });
        this.stopCheckingTyping();
      }
    }, 300);
  }
  stopCheckingTyping() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.props.sendTyping(false);
    }
  }
  componentWillUnmount() {
    this.stopCheckingTyping();
  }


  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const getTime = date => {
      return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
    };
    const date_id = Date.now().toString();
    const time = getTime(new Date(Date.now()));
    const { toUserId, socket } = this.props;
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const userId = decoded.id;
    const { message, send_to_email } = this.state;

    socket.emit("SEND_MESSAGE", {
      time,
      user_id: userId,
      to_user_id: toUserId,
      message,
      send_to_email,
      date_id
    });

    axios
      .post(`${process.env.REACT_APP_DOMAIN}/messenger`, {
        time,
        userId,
        toUserId,
        message,
        send_to_email,
        date_id
      })
      .then(result => {
        if (result) {
          const { msg, messageSent } = result.data;
          this.setState({ msg, messageSent });
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
    this.setState({ message: "" });
  };

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <textarea
              rows="2"
              cols="50"
              className="form-control messenger-input"
              name="message"
              form="usrform"
              placeholder="Write a message ... "
              value={this.state.message}
              onChange={this.handleChange}
              onKeyUp={e => {
                e.keyCode !== 13 && this.sendTyping(e.keyCode);
              }}
            />
          </div>
          <div className="messenger-send-btn-checkbox">
            <div className="form-group messenger-checkbox">
              <input
                type="checkbox"
                name="send_to_email"
                onChange={this.handleChangeCheckbox}
              />
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
