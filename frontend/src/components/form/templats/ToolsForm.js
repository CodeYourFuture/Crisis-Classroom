import React from 'react';
import Input from '../../input';
// import Label from '../../label';
import Button from '../../button';
import Context from './context';
import axios from 'axios';

class Form extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      tools: props.tools,
    };
  }

  onChangeToolshandler = (e, index) => {
    const tool = this.state.tools[index];
    const newtool_name = {...tool, [e.target.name]: e.target.value};
    this.setState ({
      tools: this.state.tools.map (
        (tool, i) => (i === index ? newtool_name : tool)
      ),
    });
  };

  onChangeImageToolshandler = (e, index) => {
    const tool = this.state.tools[index];
    const data = new FormData ();
    data.append ('image', e.target.files[0]);
    axios.post (`${process.env.REACT_APP_DOMAIN}/files`, data).then (result => {
      const new_tool_image = {...tool, tool_image: result.data.image};
      this.setState ({
        tools: this.state.tools.map (
          (tool, i) => (i === index ? new_tool_image : tool)
        ),
      });
    });
  };

  addToolsHandler = e => {
    this.setState ({
      tools: [
        ...this.state.tools,
        {tool_id: this.state.tools.length + 1, tool_name: '', tool_image: ''},
      ],
    });
  };

  removeToolsImgHandler = tool_id => {
    const {tools} = this.state;
    tools.forEach (tool => {
      if (tool.tool_id === tool_id) {
        tool.tool_image = null;
      }
    });
    this.setState ({
      tools,
    });
  };

  removeToolsHandler = i => {
    const {tools} = this.state;
    let removeResult = tools.filter (tool => tool.tool_id !== i);
    this.setState ({
      tools: removeResult,
    });
  };

  render () {
    return (
      <div className="template-form">
      <div>
        <div>
          {this.props.id
            ? <h2> Edit, Remove or add Tools </h2>
            : <h2> Tools </h2>}
          {this.state.tools &&
            this.state.tools.map (({tool_name, tool_image, tool_id}, i) => {
              return (
                <div key={i}>
                  <div className="form-group">
                    <div className="lessonInput">
                      <Input
                        className="form-control"
                        type="text"
                        name="tool_name"
                        onChange={e => this.onChangeToolshandler (e, i)}
                        placeholder="Tool Name..."
                        value={tool_name}
                      />&nbsp;
                      {!tool_image
                        ? <div>
                            <label className="btn btn-outline-dark">
                              Upload an image
                              <input
                                style={{display: 'none'}}
                                type="file"
                                name="tool_image"
                                onChange={e =>
                                  this.onChangeImageToolshandler (e, i)}
                                accept="image/*"
                              />
                            </label>
                          </div>
                        : <div
                            className="image-container"
                            onClick={() => this.removeToolsImgHandler (tool_id)}
                          >
                            <img
                              className="image"
                              width="100px"
                              src={tool_image}
                              alt="tool"
                            />
                            <div className="middle">
                              <div className="text">Remove</div>
                            </div>
                          </div>}
                      &nbsp;
                      <Button
                        className="btn btn-outline-danger lessonBtn"
                        value="Remove"
                        onClick={() => this.removeToolsHandler (tool_id)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <Button
          className="btn btn-outline-dark"
          value="Add"
          onClick={this.addToolsHandler}
        />
        </div>
        <hr/><hr/>
        <div  className="template-form-btn">
        <div>
          <Button
            className="btn btn-outline-dark"
            value="previous"
            onClick={this.props.previousFormHandler}
          />
          </div>
          <div className="btn-right">
          <Button
            className="btn btn-outline-dark "
            value="Next"
            onClick={() => this.props.onAddTools (this.state.tools)}
          />
          </div>
        </div>
      </div>
    );
  }
}

export default class ToolsFormWrapper extends React.Component {
  render () {
    return (
      <Context.Consumer>
        {({onAddTools, tools, previousFormHandler, id}) => (
          <Form
            tools={tools}
            onAddTools={onAddTools}
            previousFormHandler={previousFormHandler}
            id={this.props.id}
          />
        )}
      </Context.Consumer>
    );
  }
}

// index.js:2178 Warning: Encountered two children with the same key, `3`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.
//     in div (at ToolsForm.js:79)
//     in div (at ToolsForm.js:78)
//     in Form (at ToolsForm.js:172)
//     in ToolsFormWrapper (at index.js:124)
