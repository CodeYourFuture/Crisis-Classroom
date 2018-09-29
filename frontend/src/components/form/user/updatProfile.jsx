import React, { Component } from "react";
import AddSkill from "./addSkill";
import AddExperieance from "./addExperience";

class Enrollment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toShow: "AddSkill"
    };
  }
  onClick = e => {
    this.setState({ toShow: e });
  };
  render() {
    const { toShow } = this.state;
    return (
      <div>
        <button
          type="button"
          className="btn btn-info btn-block"
          data-toggle="modal"
          data-target="#myModal"
        >
          Update your Profile
        </button>
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="container">
                  <div className="enrollment">
                    <div>
                      <button
                        className="btn btn-info btnblock"
                        onClick={() => this.onClick("AddSkill")}
                      >
                        Add Skill
                      </button>
                      <button
                        className="btn btn-info btnblock"
                        onClick={() => this.onClick("AddExperieance")}
                      >
                        Add Sxperieance
                      </button>
                    </div>
                    <hr />
                    {toShow === "AddSkill" && (
                      <AddSkill showBackData={this.props.showBackData} />
                    )}
                    {toShow === "AddExperieance" && (
                      <AddExperieance showBackData={this.props.showBackData} />
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Enrollment;
