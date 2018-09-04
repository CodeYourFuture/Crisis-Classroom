import React, { Component } from "react";
import axios from "axios";
import decode from "jwt-decode";
import * as ReactDOM from "react-dom";

import TeachersCommunication from "../form/user/teachersCommunication";

export default class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      msg: null,
      userMessages: [],
      toUserMessages: [],
      isTyping: false
    };
    this.socketEvents = []; //soket events
  }

  //get data from soket in backend
  UNSAFE_componentWillMount() {
    const { socket, teacher } = this.props;
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const userId = decoded.id;
    const toUserId = teacher.id;
    this.getMessages();

    socket.on(`RECEIVE_MESSAGE${userId}${toUserId}`, message => {
      this.addMessage(message);
    });

    socket.on(`RECEIVE_MESSAGE${toUserId}${userId}`, message => {
      this.addMessage(message);
    });
    socket.on(`TYPING${toUserId}${userId}`, isTyping => {
      this.setState({ isTyping });
    });
  }
  //send typing event
  sendTyping = isTyping => {
    const { socket, teacher } = this.props;
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const userId = decoded.id;
    const toUserId = teacher.id;
    socket.emit("TYPING", { userId, toUserId, isTyping });
  };

  //clear socket events
  componentWillUnmount() {
    this.deinitialize();
  }

  deinitialize() {
    const { socket } = this.props;
    this.removeSocketEvents(socket, this.socketEvents);
  }

  removeSocketEvents(socket, events) {
    if (events.length > 0) {
      socket.off(events[0]);
      this.removeSocketEvents(socket, events.slice(1));
    }
  }

  //add messages to state
  addMessage = message => {
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const userId = decoded.id;
    if (userId === message.user_id) {
      const userMessages = [...this.state.userMessages, message];
      this.setState({ userMessages });
    }
    if (userId === message.to_user_id) {
      const userMessages = [...this.state.userMessages, message];
      this.setState({ userMessages });
    }
    this.socketEvents.push(message);
  };

  //get messages from db
  getMessages() {
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const userId = decoded.id;
    const toUserId = this.props.teacher.id;
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/get-messages`, {
        userId,
        toUserId
      })
      .then(result => {
        if (result) {
          const { userMessages, toUserMessages } = result.data;
          this.setState({ userMessages, toUserMessages });
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

  //sort messages
  dynamicSort = property => {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return (a, b) => {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };
  //order and return messages
  messages = () => {
    const { userMessages, toUserMessages } = this.state;
    const token = localStorage.getItem("id_token");
    const decoded = decode(token);
    const userId = decoded.id;
    const resultMessages = userMessages
      .concat(toUserMessages)
      .sort(this.dynamicSort("date_id"));
    return resultMessages.map((messages, i) => {
      const cls =
        messages.user_id === userId ? "user-messages" : "to-user-messages";
      return (
        <div className={`${cls}-div`} key={i}>
          <div className={cls}>
            <p className="message-text">{messages.message}</p>
            <p className="message-time">{messages.time}</p>
          </div>
        </div>
      );
    });
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }
  //scroll messages to bottom
  scrollToBottom = () => {
    setTimeout(() => {
      const { messageList } = this.refs;
      const scrollHeight = messageList.scrollHeight;
      const height = messageList.clientHeight;
      const maxScrollTop = scrollHeight - height;
      ReactDOM.findDOMNode(messageList).scrollTop =
        maxScrollTop > 0 ? maxScrollTop : 0;
    }, 300);
  };
  render() {
    const { teacher, socket } = this.props;
    const { isTyping } = this.state;
    return (
      <div className="container">
        <div>
          <button
            type="button"
            className="btn btn-info btn-lg"
            data-toggle="modal"
            data-target="#myModal"
            onClick={this.scrollToBottom}
          >
            Messenger
          </button>
          <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    Close
                  </button>
                  <h4 className="modal-title">{teacher.sur_name}</h4>
                </div>
                <div className="modal-body">
                  {!socket ? (
                    <div>Loding...</div>
                  ) : (
                    <div>
                      <div className="messenger-div">
                        <div id="messenger" className="mesenger">
                          <div ref={`messageList`} id="message-content">
                            {this.messages()}
                            {isTyping && <p>{teacher.sur_name} is typing...</p>}
                          </div>
                        </div>
                      </div>
                      <TeachersCommunication
                        toUserId={teacher.id}
                        socket={this.props.socket}
                        sendTyping={this.sendTyping}
                      />
                    </div>
                  )}
                </div>

                <div className="messenger-form-container" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
